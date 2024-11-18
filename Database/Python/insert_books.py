# This file will serve to put books from the csv into the database
import pandas as pd
import pymysql, os
from numpy import NAN

# Path to the csv file
fp = '/Users/Zahir/Desktop/ZMD_SWE_Geffen/Database/Python/CSVs/master.csv'
#filepath = os.path.join(os.path.dirname(__file__), fp)
filepath = '/Users/Zahir/Desktop/ZMD_SWE_Geffen/Database/Python/CSVs/master.csv'

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
    data = pd.read_csv(file) # Skip the first 2 rows and read 20 rows
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
# DANNY: 
# inputs information from csv to database
def insert_books():
    counter = 0
    cursor = connection.cursor() # Create a cursor object
    for index, row in data.iterrows():
        isbn, title, author, description, uf_tags, final_tags, language = row['ISBN'], row['Title'], row['Author'], row['Description'], row['Unformatted Tags'],row['Formatted Tags'], row['Language'] # add ,row['Langauge']
        
        # Check there are no nan values
        if pd.isna(title):
            print("Title is empty, try again")
            return
        if pd.isna(author):
            print(f"Author for {title} is empty, try again")
            return
        if pd.isna(isbn):
            print(f"ISBN for {title} is empty, try again")
            return
        if pd.isna(description):
            description = "No description available"
        if pd.isna(uf_tags):
            print(f"Unformatted tags for {title} is empty, try again")
            return
        if pd.isna(final_tags) or final_tags == '[]' or final_tags == '':
            print(f"Formatted tags for {title}.")
            final_tags = "[empty tag]"
            print(f'Edited Final Tag: {final_tags}')
            print(f"Formatted tags for {title} is empty, try again.")
            #return
        if pd.isna(language):
            language = "No language given"
            print('Language was empty, set to "No language given"')
            #return

        # Check if the book already exists in the database
        cursor.execute("SELECT ISBN FROM Books WHERE ISBN = %s", (isbn,))
        result = cursor.fetchone()
        if result:
            print(f"Book with ISBN {isbn} already exists in the database")
            continue
        print(f"Final Tag: {final_tags}")
         
        # Push into the books table
        cursor.execute("INSERT INTO Books (ISBN, Title, Author, Description) VALUES (%s, %s, %s, %s)", (isbn, title, author, description))
        print(f"Inserted {title} into the Books table")
        counter += 1
        print(f"Counter: {counter}")

        # For language, we need to check if the language is in the database, if not, we need to throw an error
        language = language.split(',')
        print(f"Language1: {language}")
        for lang in language:
            lang = lang.strip()
            print(f"Language2: {lang}")
            cursor.execute("SELECT LanguageID FROM Language WHERE LanguageName = %s", (lang,))
            result = cursor.fetchone()
            if result:
                language_id = result[0] 
            elif(lang == '' or lang == 'nan'): # If the language is empty, we skip
                lang = 'no language given'
                language_id = 80
            else:
            # Insert the language and get the new ID
                cursor.execute("INSERT INTO Language (LanguageName) VALUES (%s)", (lang,))
                language_id = cursor.lastrowid
                print(f"Inserted {lang} into the Language table")
            cursor.execute("INSERT INTO Book_Language (ISBN, LanguageID) VALUES (%s, %s)", (isbn, language_id))
        
        # For unformatted tags, we compare them to the subtopics. If they are not in the subtopics, we reject the tag
        # If they are in the subtopics, we add them to the book_subtopics table
        uf_tags = uf_tags.split(',')
        print(f"Unformatted Tags: {uf_tags}")
        for tag in uf_tags:
            tag = tag.strip("'[]")
            print(f"Tag: {tag}")
            cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s", (tag,))
            result = cursor.fetchone()
            if result:
                subtopic_id = result[0]
            else:
                #print(f"Could not find subtopic for: {tag}, try again")
                subtopic_id = 528
                # Check if the ISBN-SubtopicID pair already exists
                cursor.execute("SELECT 1 FROM Book_Subtopics WHERE ISBN = %s AND SubtopicID = %s", (isbn, subtopic_id))
                exists = cursor.fetchone()
                if exists:
                    print('Skipping')
                    #print(f"Book with ISBN {isbn} already has subtopic {subtopicId}")
                    continue
            cursor.execute("INSERT INTO Book_Subtopics (ISBN, subtopicID) VALUES (%s, %s)", (isbn, subtopic_id))
            


        # fetch the topic ID
        #===========
        #Danny: 

        # For book description, just insert into book table no problem

        # For unformatted, first check against subtopics,
        # if not in subtopics, reject tag
        # if in subtopics, add into book_subtopics


        # If we have just 1 thing, we just check the subtopic of it 
        final_tags = split_topic(final_tags)
        # final_tags= [['culture', 'similarities', 'differences'],[Cognition]] -> Cognition: Cognition
        for tag_list in final_tags:
            #tag_list = ['culture', 'similarities', 'differences']
            if (len(tag_list) == 1):
                print('Length is 1')
                # tag_list = ['Topic'] 
                # print(str(tag_list) + ' 1')
                subtopicId = get_or_create_subtopic(tag_list[0].lower())
                # Check if the subtopic already exists in Book_Subtopics. If it does, skip
                            # Check if the ISBN-SubtopicID pair already exists
                cursor.execute("SELECT 1 FROM Book_Subtopics WHERE ISBN = %s AND SubtopicID = %s", (isbn, subtopicId))
                exists = cursor.fetchone()

                if exists:
                    print(f"Book with ISBN {isbn} already has subtopic {subtopicId}")
                    continue


                # print(str(subtopicId) + " A")
                #FIXME
                cursor.execute("INSERT INTO Book_Subtopics (ISBN, subtopicID) VALUES (%s, %s)", (isbn, subtopicId))

            else:
                print("Length is greater than 1")
                #['Topic", subTopic, subTopic, ... , subTopic]
                # topicId = get_topic_id(tag_list[0])
                # print(topicId)
                for tag in tag_list[1:]:
                    #tag = 'subTopic'
                    # print(str(tag) + ' 2')
                    subtopicId = get_or_create_subtopic(tag.lower())
                    cursor.execute("SELECT 1 FROM Book_Subtopics WHERE ISBN = %s AND SubtopicID = %s", (isbn, subtopicId))
                    exists = cursor.fetchone()
                    if exists:
                        print(f"Book with ISBN {isbn} already has subtopic {subtopicId}")
                        continue
                    # print(str(subtopicId) + ' B')

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
    subtopic_name = subtopic_name.strip("'[]")
    
    # Check if the subtopic exists and get its ID
    cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s", (subtopic_name))
    print(f'Subtopic Name: {subtopic_name}')
    subtopic_result = cursor.fetchone()  # Fetch the first result
    print(f'Subtopic Result: {subtopic_result}')
    if subtopic_result:
        subtopic_id = subtopic_result[0]  # Get the subtopic ID
    else:
        print(f"Could not find subtopic: {subtopic_name}, try again")
        subtopic_id = 528
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