# This file will serve to put books from the csv into the database
import pandas as pd
import pymysql, os
from numpy import NAN

# Path to the csv file
fp = '/Users/Zahir/Desktop/ZMD_SWE_Geffen/Database/Python/CSVs/test_books.csv'
#filepath = os.path.join(os.path.dirname(__file__), fp)
filepath = '/Users/Zahir/Desktop/ZMD_SWE_Geffen/Database/Python/CSVs/test_books.csv'

# Connect to the database
# REMINDER: REMOVE THE PASSWORD BEFORE COMMITTING
try:
    connection = pymysql.connect(host='localhost',
                                user='root',
                                password='', # Will fill in when needed
                                db='geffen_db')
    print("Connected to database")
except:
    # If there's an error connecting to the database, print an error message
    print("Error connecting to database")

#cursor = connection.cursor() # Create a cursor object

# Read in the csv file using pandas
with open(filepath) as file:
    data = pd.read_csv(file, nrows=20) # Skip the first 2 rows and read 20 rows
    # print(data)

# Iterate throught the final column and see if rows in final column are empty
# If they are, then replace them with 'N/A'
def final_tags_edit():
    for index, row in data.iterrows():
        if pd.isna(row['Final Tags']):
            data.at[index, 'Final Tags'] = 'Empty Tag'
    data.to_csv(filepath, index=False) # Save the updated csv

# Function to get or create topic and return TopicID [Will modify to just get, but for now we can add new]
def get_or_create_topic(topic_name):
    cursor = connection.cursor()
    # Check if the topic exists and get its ID
    cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
    topic_result = cursor.fetchone()  # Fetch the first result
    if topic_result:
        topic_id = topic_result[0] # Get the topic ID
    else:
        # Insert the topic and get the new ID
        cursor.execute("INSERT INTO Topics (TopicName) VALUES (%s)", (topic_name,))
        topic_id = cursor.lastrowid # Get the last inserted ID
        print(f"Inserted topic: {topic_name} (ID: {topic_id})")
    return topic_id

# FOR DANNY: Modify this function to read in the 'Final Tags' column, separate the tags by colons, and insert them into the database properly
# Right now it has the same code as the topics but change as needed.
#=======================================
# get_or_create_subtopic(subtopic_name, topic_id)
#subtopic_name: 
#topic_id: 
# given: "culture:similarities, culture:differences"
# do: first: [['culture', 'similarities', 'differences']]
# second: check if subtopics are in database
# if len = 1; pull stright from topics
# elseif len > 1: pull from subtopic to get topic id and subtopic i
# (if culture:similarities: 10, culture:differences : 11) [[10,11]]
# third: use insert_books to create function that inputs books into books sub topic table and topic table (refer to p1)
# 
# fourth: create function that takes 'culture', 'similarities', 'differences'] and turn it back into 
# "culture:similarities, culture:differences" to input back into subtopic and topic table - finding the difference between len=1 and len > 1
#=======================================
# DANNY: 
# unformatted_phrase: "culture:similarities, culture:differences, Cognition:Attention"
# return: [['culture', 'similarities', 'differences'][Cognition, Attention]]
def split_topic(unformatted_phrase):
    unformatted_phrase = unformatted_phrase.split(',')
    phrase = splitPhrases(unformatted_phrase)
    return phrase
#=======================================
# Danny - NEED: 
# subtopic_in: 'culture' or 'similarities' or 'differences'
# return subtopic id if one exists, else crete one and return subtopic id
'''def get_subtopic_id(subtopic_in):
    subtopic_id = "12345"
    return subtopic_id'''
#=======================================
# Danny - NEED: 
# topic_in: 'culture' or 'similarities' or 'differences'
# return topic id if one exists, else crete one and return subtopic id
'''def get_topic_id(topic_in):
    topic_id = "54321"
    return topic_id'''
#=======================================
# DANNY: 
# inputs information from csv to database
def insert_books():
    cursor = connection.cursor() # Create a cursor object
    for index, row in data.iterrows():
        isbn, title, author, final_tags = row['ISBN'], row['Title'], row['Author'], row['Final Tags'] # add ,row['Langauge']
        cursor.execute("INSERT INTO Books (ISBN, Title, Author) VALUES (%s, %s, %s)", (isbn, title, author))
        # fetch the topic ID
        #===========
        #Danny: 

        # Will be adding in here to check associated languages and inserting into book_language table
        '''
        for language in row['Language']:
            # Make sure to preprocess language (lowercase, no whitespace)
            cursor.execute("SELECT LanguageID FROM Language WHERE LanguageName = %s", (language,))
            result = cursor.fetchone()
            if result: # If the language exists
                language_id = result[0]
            else: # If the language doesn't exist
                # If we do not want to change the language name
                print("Could not find language, try again")
                return
                cursor.execute("INSERT INTO Language (LanguageName) VALUES (%s)", (language,))
                language_id = cursor.lastrowid
                
        '''

        # If we have just 1 thing, we just check the subtopic of it 

        final_tags = split_topic(final_tags)
        # final_tags= [['culture', 'similarities', 'differences'],[Cognition]] -> Cognition: Cognition
        for tag_list in final_tags:
            #tag_list = ['culture', 'similarities', 'differences']
            if (len(tag_list) == 1):
                print('Length is 1')
                #tag_list = ['Topic'] 
                print(str(tag_list) + ' 1')
                subtopicId = get_or_create_subtopic(tag_list[0].lower())
                print(str(subtopicId) + " A")
                #FIXME
                cursor.execute("INSERT INTO Book_Subtopics (ISBN, subtopicID) VALUES (%s, %s)", (isbn, subtopicId))

            else:
                print("Length is greater than 1")
                #['Topic", subTopic, subTopic, ... , subTopic]
                # topicId = get_topic_id(tag_list[0])
                # print(topicId)
                for tag in tag_list[1:]:
                    #tag = 'subTopic'
                     print(str(tag) + ' 2')
                     subtopicId = get_or_create_subtopic(tag.lower())
                     print(str(subtopicId) + ' B')

                     #FIXME
                     cursor.execute("INSERT INTO Book_Subtopics (ISBN, subtopicID) VALUES (%s, %s)", (isbn, subtopicId))
                
    # cursor.execute("INSERT INTO Books (ISBN, Title, Author) VALUES (%s, %s, %s)", (isbn, title, author))            

    connection.commit() # Commit the transaction
    cursor.close() # Close the cursor
    connection.close() # Close the connection
    print("Books inserted into the database")
#=======================================
# DANNY: DO NOT TOUCH
def splitPhrases(phrases):
    result = []
    for phrase in phrases:
        # Split the phrase by ':'
        split_parts = phrase.split(':')
        # If the first part already exists in the result, append remaining parts
        if len(split_parts) > 1 and any(split_parts[0].strip() in sublist for sublist in result):
            # Find the existing sublist that starts with the same key
            for sublist in result:
                if sublist[0] == split_parts[0].strip():
                    sublist.extend([part.strip() for part in split_parts[1:]])
                    break
        else:
            # Add new sublist for the phrase
            result.append([part.strip() for part in split_parts])
    return result
#=======================================
#=======================================

def get_or_create_subtopic(subtopic_name):
    # Create a cursor
    cursor = connection.cursor()
    
    # Check if the subtopic exists and get its ID
    cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s", (subtopic_name))
    subtopic_result = cursor.fetchone()  # Fetch the first result
    if subtopic_result:
        subtopic_id = subtopic_result[0]  # Get the subtopic ID
    else:
        print("Could not find subtopic, try again")
    #     # Insert the subtopic and get the new ID
    #     cursor.execute("INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (%s, %s)", (subtopic_name, topic_id))
    #     subtopic_id = cursor.lastrowid  # Get the last inserted ID
    #     print(f"Inserted subtopic: {subtopic_name} (ID: {subtopic_id})")
    
    # Close the cursor
    cursor.close()
    
    return subtopic_id


# Insert the books into the database
# def insert_books():
#     cursor = connection.cursor() # Create a cursor object
#     for index, row in data.iterrows():
#         isbn, title, author, final_tags = row['ISBN'], row['Title'], row['Author'], row['Final Tags']
#         # cursor.execute("INSERT INTO Books (ISBN, Title, Author) VALUES (%s, %s, %s)", (isbn, title, author))
#         # fetch the topic ID
#         S_IDS = split_topic(final_tags)
#         print(S_IDS) # Visualize the split
#         '''topic_id = get_or_create_topic(final_tags)
#         print(f"Topic ID: {topic_id}")
#         cursor.execute("INSERT INTO Book_Subtopics (ISBN, subtopicID) VALUES (%s, %s)", (isbn, topic_id))'''
#     connection.commit() # Commit the transaction
#     cursor.close() # Close the cursor
#     connection.close() # Close the connection
#     print("Books inserted into the database")

insert_books() # Insert the books into the database

# Note: The ISBNs for 'A girl like you' and 'A boy like you' by same author (Frank Murphy) gave back same isbn, 
# will need prof and others to check that the ISBNs match and then we can use. "Not our problem" - Prof

# For topics table solutions
# 1. Do we need to select the topic that is present and then insert the ID into the table?
# 2. Do we assign the topic as we insert the book into the database and use that ID.






'''# This file will serve to put books from the csv into the database
import pandas as pd
import pymysql,os
from numpy import NAN

# Path to the csv file
fp = 'test_books.csv'
filepath = os.path.join(os.path.dirname(__file__),fp)

# Connect to the database
# REMINDER: REMOVE THE PASSWORD BEFORE COMMITTING
try:
    connection = pymysql.connect(host='localhost',
                                user='root',
                                password='',# Will fill in when needed
                                db='Geffen_db')
    print("Connected to database")
except:
    # If there's an error connecting to the database,print an error message
    print("Error connecting to database")

#cursor = connection.cursor() # Create a cursor object

# Read in the csv file using pandas
with open(filepath) as file:
    data = pd.read_csv(file,nrows=20) # Skip the first 2 rows and read 20 rows
    # print(data)

# Iterate throught the final column and see if rows in final column are empty
# If they are,then replace them with 'N/A'
def final_tags_edit():
    for index,row in data.iterrows():
        if pd.isna(row['Final Tags']):
            data.at[index,'Final Tags'] = 'Empty Tag'
    data.to_csv(filepath,index=False) # Save the updated csv

# Function to get or create topic and return TopicID [Will modify to just get,but for now we can add new]
def get_or_create_topic(topic_name):
    cursor = connection.cursor()
    # Check if the topic exists and get its ID
    cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s",(topic_name,))
    topic_result = cursor.fetchone()  # Fetch the first result
    if topic_result:
        topic_id = topic_result[0] # Get the topic ID
    else:
        # Insert the topic and get the new ID
        cursor.execute("INSERT INTO Topics (TopicName) VALUES (%s)",(topic_name,))
        topic_id = cursor.lastrowid # Get the last inserted ID
        print(f"Inserted topic: {topic_name} (ID: {topic_id})")
    return topic_id

# FOR DANNY: Modify this function to read in the 'Final Tags' column,separate the tags by colons,and insert them into the database properly
# Right now it has the same code as the topics but change as needed.
def get_or_create_subtopic(subtopic_name,topic_id):
    # Create a cursor
    cursor = connection.cursor()
    
    # Check if the subtopic exists and get its ID
    cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s",(subtopic_name,topic_id))
    subtopic_result = cursor.fetchone()  # Fetch the first result
    if subtopic_result:
        subtopic_id = subtopic_result[0]  # Get the subtopic ID
    else:
        # Insert the subtopic and get the new ID
        cursor.execute("INSERT INTO Subtopics (SubtopicName,TopicID) VALUES (%s,%s)",(subtopic_name,topic_id))
        subtopic_id = cursor.lastrowid  # Get the last inserted ID
        print(f"Inserted subtopic: {subtopic_name} (ID: {subtopic_id})")
    
    # Close the cursor
    cursor.close()
    
    return subtopic_id


# Insert the books into the database
def insert_books():
    cursor = connection.cursor() # Create a cursor object
    for index,row in data.iterrows():
        isbn,title,author,final_tags = row['ISBN'],row['Title'],row['Author'],row['Final Tags']
        # cursor.execute("INSERT INTO Books (ISBN,Title,Author) VALUES (%s,%s,%s)",(isbn,title,author))
        # fetch the topic ID
        topic_id = get_or_create_topic(final_tags)
        print(f"Topic ID: {topic_id}") 
        cursor.execute("INSERT INTO Book_Subtopics (ISBN,subtopicID) VALUES (%s,%s)",(isbn,topic_id))
    connection.commit() # Commit the transaction
    cursor.close() # Close the cursor
    connection.close() # Close the connection
    print("Books inserted into the database")

insert_books() # Insert the books into the database

# Note: The ISBNs for 'A girl like you' and 'A boy like you' by same author (Frank Murphy) gave back same isbn,
# will need prof and others to check that the ISBNs match and then we can use. "Not our problem" - Prof

# For topics table solutions
# 1. Do we need to select the topic that is present and then insert the ID into the table?
# 2. Do we assign the topic as we insert the book into the database and use that ID.
'''