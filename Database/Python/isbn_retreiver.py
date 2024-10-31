# Get the ISBNs from the database and store them in a list
from isbnlib import goom, desc
import os
import pandas as pd

# Path to the csv file
fp = 'test_books.csv'
filepath = os.path.join(os.path.dirname(__file__), fp)

# Connect to the csv
with open(filepath) as file:
    data = pd.read_csv(file, skiprows=0) # Skip the first 2 rows
    print(data.head())

# Get the ISBNs based on title 
def fetch_isbn_by_title(title):
    try:
        # Search for the book by title using isbnlib's goom function
        results = goom(title)
        if results and 'ISBN-13' in results[0]:
            print(f"ISBN found for '{title}': {results[0]['ISBN-13']}")
            return results[0]['ISBN-13']
    except Exception as e:
        print(f"Error fetching ISBN for '{title}': {e}")
    return None

# Loop through the rows and fill in missing ISBNs
for index, row in data.iloc[:20].iterrows():
    if pd.isna(row['ISBN']):  # Check if ISBN is missing
        title = row['Title']
        isbn = fetch_isbn_by_title(title)
        if isbn:
            data.at[index, 'ISBN'] = isbn  # Update the ISBN in the DataFrame
            print(f"Updated ISBN for '{title}': {isbn}")
        else:
            print(f"No ISBN found for '{title}'")

# Save the updated CSV
# output_path = 'updated_books_file.csv'  # Update with desired output path
data.to_csv(filepath, index=False)

print("ISBN update completed.")