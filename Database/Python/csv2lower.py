# convert all text in a csv to lowercase

import os
import pandas as pd

# Path to the csv file
fp = 'CSVs/text/Final_Tags.csv'
filepath = os.path.join(os.path.dirname(__file__),fp)
print('Found Filepath')

# Connect to the csv
with open(filepath) as file:
    data = pd.read_csv(file,skiprows=0) # Skip the first 2 rows

# Convert all text in the csv to lowercase
data = data.apply(lambda x: x.astype(str).str.lower())

# Alphabetize the data
data = data.sort_values(by='Language')
print(data)

# write the changes to the same csv
data.to_csv(filepath,index=False)

