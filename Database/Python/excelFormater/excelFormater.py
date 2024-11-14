import pandas as pd
from isbnlib import isbn_from_words, desc

def csv_to_list(filepath):
    # Read the CSV file into a DataFrame
    df = pd.read_csv(filepath)
    # Convert each row to a list and store all rows in a list
    rows_list = [list(row) for row in df.values]
    return rows_list

def format_csv(list):
    tempList = []
    tempTitleList = []
    tempLanguageList = []
    for books in list:
        #print("books: ", books)
        tempTitle = books[0]
        tempLanguage = books[3]
        if pd.isna(tempLanguage):
            tempLanguage = "no language given"
        tempTitleList.append(tempTitle)
        tempLanguageList.append(tempLanguage)
    tempList.append([tempTitleList, tempLanguageList])

    return tempList

def getLanguage(title,title_language):
    tempTitle = title_language[0][0]
    #print(tempTitle)
    if title in tempTitle:
        #print("good")
        index = tempTitle.index(title) 
        print("index: ", index)
        return title_language[0][1][index]
    else:
        print("Book was not found")




file_path_bookListDanny = 'Database/Python/excelFormater/Picture Books - Books to use-raw data.csv'
bookRow_in_List = csv_to_list(file_path_bookListDanny)
title_Language = format_csv(bookRow_in_List)



print("1: ",getLanguage("7 ate 9: the untold story",title_Language))
print("2: ",getLanguage("a friend like you",title_Language))
print("3: ",getLanguage("A Hundred thousand welcomes",title_Language))
print("4: ",getLanguage("I'm hungry Tengo Hambre",title_Language))
print("5: ",getLanguage("Mawkiljemk Mi'kmawiktuk (Counting in Mi'kmaw)",title_Language))
print("6: ",getLanguage("Cesaria Feels the Beat ",title_Language))



