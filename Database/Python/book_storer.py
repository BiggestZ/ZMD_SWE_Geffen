# This file will serve to put books from the csv into the database
import pandas as pd
import pymysql, os
from numpy import NAN

# Path to the csv file
fp = 'test_books.csv'
filepath = os.path.join(os.path.dirname(__file__), fp)

# Connect to the database
# REMINDER: REMOVE THE PASSWORD BEFORE COMMITTING
try:
    connection = pymysql.connect(host='localhost',
                                user='root',
                                password='', # Will fill in when needed
                                db='Geffen_db')
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

# Insert the books into the database
def insert_books():
    cursor = connection.cursor() # Create a cursor object
    for index, row in data.iterrows():
        isbn, title, author, final_tags = row['ISBN'], row['Title'], row['Author'], row['Final Tags']
        # cursor.execute("INSERT INTO Books (ISBN, Title, Author) VALUES (%s, %s, %s)", (isbn, title, author))
        # fetch the topic ID
        topic_id = get_or_create_topic(final_tags)
        print(f"Topic ID: {topic_id}")
        cursor.execute("INSERT INTO Book_Topics (ISBN, TopicID) VALUES (%s, %s)", (isbn, topic_id))
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
