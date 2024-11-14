import os
import pandas as pd
import numpy as np
import ast
from isbnlib import isbn_from_words, desc
#======================================
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
#==============================
def csv_to_list(filepath):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(filepath)
    # Convert each row to a list and store all rows in a list
    rows_list = [list(row) for row in df.values]
    return rows_list


#print(bookRow_in_List)

#===========================

def tag_to_list(filepath):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(filepath,usecols=[0])
    # Convert each row to a list and store all rows in a list
    rows_list = df.iloc[:, 0].tolist()
    return rows_list


#print(bookRow_in_List)

#===========================
def subtag_to_list(filepath):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(filepath,usecols=[1])
    # Convert each row to a list and store all rows in a list
    rows_list = df.iloc[:, 0].tolist()
    return rows_list


#print(bookRow_in_List)

#===========================
# in: bookRow = bookRow_in_List
# modifies row[3] of bookRow_in_List to the correct format
def bookRow_format(bookRow):
    for row in bookRow:
        #print(type(row[3]))
        row3 = row[3]
        if (row3 == "") or (row3=='[]') or (pd.isna(row3)):
        #if row[3] == "" or row[3] is None or str(row[3]).strip() == "":
            #print("empty: ", row[3])
            continue
        else:
        
            row[3] = splitPhrases(row3.split(','))
            
            #print("good: ", row[3])
    
    


#===========================
# def tag_in_bank(tag,bank_list):

#===========================
def compare_tags(bookRow, subbank, tagbank):
    for row in bookRow:
        unformat_tags = ast.literal_eval(row[2])
        #print(unformat_tags)
        temp_exists = []
        temp_no_exists = []
        for tag in unformat_tags:
            #print(tag)
            
            if tag.lower() in subbank:
                #print("tagfound: ", tag)
                index = subbank.index(tag.lower())
                temp = [tagbank[index] + ":" + tag]
                temp_exists.append(temp)
            else:
                
                temp_no_exists.append(tag)
                continue
                
        row[2] = temp_no_exists
       # print("row[3]", row[3])
        #row[3] = row3 + temp_exists
        # print("row[3] in compare_tags: ", row[3])
        # print("row[3] type ", type(row[3]))
        
        
        row3 = row[3]
        if isinstance(row3, float) and pd.isna(row3):
            #print("row3 is NaN: ", row3)
            continue
        elif isinstance(row3, list) and len(row3) > 0:
            #print("row3 is a non-empty list: ", row3)
            row[3] = row[3] + temp_exists
        else:
            print("ERROR")
            
        # if (pd.isna(row3).all()):
        #     print("empty: ", row[3])
        #     print("\n")
        #     continue
        # else:
        #     print("good: ", row[3])
        #     print("\n")
        #     #row[3] = row3.append(temp_exists)
            
        
        
#===========================   
def final_to_csv(bookList,filepath):
    # Combine the nth elements of each list into new lists
    combined_data = []
    for i in range(len(bookList)):
        #ISBN, Title, Author, Desc, UF Tags, F Tags
        data = [isbn_from_words(bookList[i][0]),bookList[i][0],bookList[i][1],desc(isbn_from_words(bookList[i][0])),
                bookList[i][2],bookList[i][3]]
        # data = [123456789,bookList[i][0],bookList[i][1],"desc(isbn_from_words(bookList[i][0]))",
        #         bookList[i][2],bookList[i][3]]
        combined_data.append(data)
    #print(combined_data)
    df = pd.DataFrame(combined_data)
    # Save DataFrame to CSV
    df.to_csv(filepath, index=False, header = ["ISBN","Title","Author","Description","Unformatted Tags", "Formatted Tags"])
    print("listToCSV done")



    # combined_data = [ISBN[i], Title[i], Author[i], Desc[i], UF_Tags[i], F_tags[i]] 
    
    
    # # Convert the combined data into a DataFrame
    # df = pd.DataFrame(combined_data, columns=["ISBN", "Title", "Author", "Desc", "UF_Tags", "F_Tags",])
    
    # # Write the DataFrame to a CSV file
    # df.to_csv(filename, index=False)
    # print("final_to_csv done")






        
#==================
print("Start:")
print("\n")

print("Start csv to list")
file_path_bookListDanny = '/Users/dannykim/Documents/Pycharm Projects/ZMD_SWE_Geffen/Database/Python/bookListDanny.csv'
file_path_test = '/Users/dannykim/Documents/Pycharm Projects/ZMD_SWE_Geffen/Database/Python/test.csv'
bookRow_in_List = csv_to_list(file_path_bookListDanny)
tag_bank = tag_to_list(file_path_test)
subtag_bank = subtag_to_list(file_path_test)
# print(tag_bank)
# print("\n\n\n\n")
# print(subtag_bank)
print("End csv to list")
print("\n")

print("Start bookRow_format")
bookRow_format(bookRow_in_List)
print("bookRow_in_list after bookRow_format")
#print(bookRow_in_List)
print("End bookRow_format")
print("\n")

print("start compare_tags")
compare_tags(bookRow_in_List,subtag_bank,tag_bank)
print("bookRow_in_list after compare_tags")
#print(bookRow_in_List)
print("End compare_tags")
print("\n")

print("start final_to_csv")
master_filepath = '/Users/dannykim/Documents/Pycharm Projects/ZMD_SWE_Geffen/Database/Python/master.csv'
final_to_csv(bookRow_in_List,master_filepath)
print("End final_to_csv")
print("\n")



#==================

print("DONE")