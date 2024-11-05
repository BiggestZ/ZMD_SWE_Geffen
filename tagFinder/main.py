import csv
import pandas as pd
from isbnlib import isbn_from_words, desc
import os
os.chdir('/Users/dannykim/Documents/Pycharm Projects/ZMD_SWE_Geffen/tagFinder/')
#======================================
def getTag(list, bank):
    temp = list.split(',')
    Tags = []
    nullTags = []
    for word in temp:
        if word[0] == " ":
            word = word.replace(" ", '',1)

        for row in bank:
            if word.lower() in row:
                Tags.append(word)
            else:
                nullTags.append(word)


    sortedTags = [Tags, nullTags]

    return  sortedTags

#======================================
emptyBookList = [["Title", "Author", "Tags", "Null-Tags","Isbn"]]
firstColumnEmptyBookList = [["Title", "Author", "Tags", "Null-Tags","Isbn"]]


#=================
#input: FormatedTags.csv 
#output: [['actions and consequences'], ['activism'], ['adaptation'], ['advocacy'], ..., ]
def formatTags():
    print("Start formatTags")
    tempList = []
    df = pd.read_csv('FormatedTags.csv')
    allRows = df.values.tolist()
    for row in allRows:
        if pd.isna(row[1]):
            if pd.isna(row[0]) == False:
                tempList.append([row[0].lower()])
            
        else:
            partialRow = []
            for subTag in row:
                if pd.isna(subTag) == False:
                    partialRow.append(subTag.lower())
            partialRow.pop()
            tempList.append(partialRow)
    # print("\n")
    # print(tempList)
    # print("\n")
        
    print("End formatTags")
    return tempList
#=================
#input: none (uses global BOOKLIST )
#output: changes BOOKLIST
# [1123456789101, '7 ate 9: the untold story', 'Tara Lazar', ' ', ' ', 'culture:similarities, culture:differences', nan], ... ,]
BOOKLIST = []
def makeBookList():
    print("Start makeBookList")
    df = pd.read_csv('newBookList.csv')
    allRows = df.values.tolist()
    for row in allRows:
        tempRow = []
        if pd.isna(row[1]) == False:
            tempRow = row
        BOOKLIST.append(tempRow)
    # print("\n")
    # print(BOOKLIST)
    # print("\n")

    print("End makeBookList") 
#======================================
#input: expects BOOKLIST (culture:similarities, culture:differences)
#output: alters BOOKLIST[5] ([['culture', 'similarities', 'differences']])
#gets the book tags and isbns into BOOKLIST 
def getBooksTag(bookList):
    
    for row in bookList:
        tempRow = row[5]
        tempRow = tempRow.split(',')
        phrase = splitPhrases(tempRow)
        row[4] = phrase
        row[0] = isbn_from_words(row[1])
        row[3] = desc(row[0])
        
        #===================
        #formatting 
        row.pop()
        row.pop()
        #===================
    print("End getBooksTag")

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
def listToCSV(list, filename="test3.csv"):
    # Create a DataFrame from the list
    df = pd.DataFrame(list)
    
    # Save DataFrame to CSV
    df.to_csv(filename, index=False, header = ["ISBN","Title","Author","Description","Tags"])
    print("listToCSV done")
#==============================
formatTags()
makeBookList()
getBooksTag(BOOKLIST)
listToCSV(BOOKLIST)
#==============================
print("done")
print("\n")