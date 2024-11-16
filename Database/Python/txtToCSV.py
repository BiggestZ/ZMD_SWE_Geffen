import csv
import glob
import os

def convert_text_to_csv(directory: str, output_file: str):
    # Find all .txt files in the specified directory
    text_files = glob.glob(os.path.join(directory, '*.txt'))
    
    if not text_files:
        print("No text files found in the specified directory.")
        return

    data = []
    
    for text_file in text_files:
        current_category = None
        has_subcategory = False  # Track if the current category has any subcategories

        with open(text_file, 'r') as file:
            lines = file.readlines()

        for line in lines:
            line = line.strip()  # Remove any leading/trailing whitespace
            if not line:
                continue  # Skip empty lines

            # Check if the line is a main category or a subcategory
            if not line.startswith(('-', '*')):
                # If there's a previous category without subcategories, add it as its own subcategory
                if current_category and not has_subcategory:
                    data.append([current_category, current_category])
                
                # This is a new main category
                current_category = line
                has_subcategory = False  # Reset subcategory tracker for the new category
            else:
                # This is a subcategory (remove the marker and whitespace)
                subcategory = line.lstrip('-*').strip()
                if current_category:
                    data.append([current_category, subcategory])
                    has_subcategory = True  # Mark that this category has subcategories

        # After the loop, check if the last category needs to be added as its own subcategory
        if current_category and not has_subcategory:
            data.append([current_category, current_category])

    # Write the data to a CSV file
    with open(output_file, 'w', newline='') as csv_file:
        writer = csv.writer(csv_file)
        writer.writerow(['Category', 'Subcategory'])  # Header row
        writer.writerows(data)

    print(f"Data has been successfully written to {output_file}")

# Example usage: specify the directory containing text files and the desired output CSV file
convert_text_to_csv('/Users/Zahir/Desktop/ZMD_SWE_Geffen/Database/Python/CSVs/text', 'output.csv')
