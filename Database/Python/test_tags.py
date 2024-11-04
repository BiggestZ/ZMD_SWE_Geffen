# Where I will use python to interact with the database: Add in topics and subtopics

from numpy import NAN
import pandas as pd
import pymysql, os

# Connect to the database 
# REMINDER: REMOVE THE PASSWORD BEFORE COMMITTING
try:
    connection = pymysql.connect(host='localhost',
                                user='root',
                                password='', # Will fill in when needed
                                db='Geffen_db')
    print("Connected to database")
except:
    print("Error connecting to database")

cursor = connection.cursor() 

# Read the CSV file using pandas
with open('Database/Python/test.csv') as file:
    data = pd.read_csv(file, na_values = [""])
    next(data.iterrows()) # Skip the first row
# Insert the main topic if it's not already in the table
for index, row in data.iterrows():
    topic, subtopic = row['Topic'], row['Subtopic']
    
    # Check if the topic exists in the Topics table
    cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic,))
    result = cursor.fetchone()

    if result:
        topic_id = result[0]
    else:
        # Insert the topic if it doesn't exist
        cursor.execute("INSERT INTO Topics (TopicName) VALUES (%s)", (topic,))
        topic_id = cursor.lastrowid
        
    # If there's a subtopic, insert it into the Subtopics table
    if not pd.isna(subtopic):
        cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s", (subtopic,))
        subtopic_result = cursor.fetchone()

        if not subtopic_result:
            cursor.execute(
                "INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (%s, %s)",
                (subtopic, topic_id)
            )
# Commit the transaction and close the connection
connection.commit()
cursor.close()
connection.close()
# Commit the transaction and close the connection
# Insert the data into the database