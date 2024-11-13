# Store the langauges in the language table
from numpy import NAN
import pandas as pd
import pymysql,os

# Connect to the database 
# REMINDER: REMOVE THE PASSWORD BEFORE COMMITTING
try:
    connection = pymysql.connect(
            host='localhost',
            user='root',
            password='', # Will fill in when needed
            database='geffen_db',
            # cursorclass=pymysql.cursors.DictCursor  # Ensures results are returned as dictionaries
    )
    print("Connected to database")
except:
    print("Error connecting to database")

cursor = connection.cursor() 

# Read the CSV file using pandas
with open('Database/Python/CSVs/language.csv') as file:
    data = pd.read_csv(file,na_values = [""])
    next(data.iterrows()) # Skip the first row
# Insert the main topic if it's not already in the table
for index,row in data.iterrows():
    language = row['Language']
    
    # Check if the topic exists in the Topics table
    cursor.execute("SELECT LanguageID FROM Language WHERE LanguageName = %s",(language))
    result = cursor.fetchone()

    if result:
        language_id = result[0]
    else:
        # Insert the topic if it doesn't exist
        cursor.execute("INSERT INTO Language (LanguageName) VALUES (%s)",(language))
        language_id = cursor.lastrowid
        print(f"Inserted {language} into the Language table")

# Commit the transaction and close the connection
connection.commit()
cursor.close()
connection.close()
# Commit the transaction and close the connection
# Insert the data into the database