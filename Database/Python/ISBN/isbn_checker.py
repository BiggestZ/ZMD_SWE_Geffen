# This program will go through the csv file and check each ISBN and compare the retrieved title to
# The title in the file. Store non-matching titles in a list and print them out.

import os,isbnlib
import pandas as pd

# Path to the csv file
fp = 'test_books.csv'
filepath = os.path.join(os.path.dirname(__file__),fp)

# Connect to the csv
with open(filepath) as file:
    data = pd.read_csv(file,skiprows=0) # Skip the first 2 rows
    print(data.head())

# Get the ISBNs based on title
