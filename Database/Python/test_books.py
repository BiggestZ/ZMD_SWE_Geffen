# Where I will use python to interact with the database: Add in books from the 'test shared' google sheet

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
    # If there's an error connecting to the database, print an error message
    print("Error connecting to database")

# Read in the csv file using pandas
with open('Database/Python/test_books.csv') as file:
    data = pd.read_csv(file, skiprows=2) # Skip the first 2 rows
    print(data)

# Only read in 20 rows for now. This is for testing purposes

# Ignore the null tags & non-final tags column
data = data[['Title', 'Author', 'Final Tags']]

