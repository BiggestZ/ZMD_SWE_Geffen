import csv
import pandas as pd
from isbnlib import isbn_from_words, desc
import os
os.chdir('/Users/dannykim/Documents/Pycharm Projects/ZMD_SWE_Geffen/tagFinder/')
#print("Current working directory:", os.getcwd())

#converts csv into lists
#zmdSorted = list of books and tags
# with open('zmdSorted.csv', 'r') as csvfile:
#     csv_reader = csv.reader(csvfile)
#     rows = []
#     for row in csv_reader:
#         rows.append(row)
# #bookTerms = desired tags
# with open('bookTerms.csv', 'r') as csvfile:
#     csv_reader = csv.reader(csvfile)
#     bank = []
#     for row in csv_reader:
#         bank.append(row)

# #================================================
# #cleans up data (remove whitespace and convert to lower case)
# tempBank = []
# for i in bank:
#     if i[0][len(i)-2] == " ":

#         tempword = i[0][:-1]
#         tempBank.append(tempword.lower())

#     else:

#         tempBank.append(i[0].lower())
# tempBank.pop(0)
# bank = tempBank
#======================================
#intakes data (one "row" at a time) and returns a list with desired tags (Tags) and undesired tags (nullTags)
# original code 
#  def getTag(list, bank):
#     temp = list.split(',')
#     Tags = []
#     nullTags = []
#     for word in temp:
#         if word[0] == " ":
#             word = word.replace(" ", '',1)
#         if word.lower() in bank:
#             Tags.append(word)
#         else:

#             nullTags.append(word)
#     sortedTags = [Tags, nullTags]

#     return  sortedTags
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
#formats the sorted tags into FinalFinalList, matches tags with author and title
# FinalFinalList = [["Title", "Author", "Tags", "Null-Tags","Isbn"]]
# def sortCSV(csv):
#     counter = 0

#     for row in csv:
#         finalTags = getTag(row[4],bank)
#         finalRow = [row[0], row[1],finalTags[0],finalTags[1],isbn_from_words(row[0])]
#         #==================
#         #print("finalTags[0]:",finalTags[0])
#         #print("finalTags[1]:", finalTags[1])
#         if (finalTags[0] == []  and finalTags[1] == ['0']):
#             emptyBookList.append(finalRow)
#         if (finalTags[0] == []  and finalTags[1] != ['0']):
#             firstColumnEmptyBookList.append(finalRow)


#         #==================
#         FinalFinalList.append(finalRow)
#         counter +=1

#======================================
emptyBookList = [["Title", "Author", "Tags", "Null-Tags","Isbn"]]
firstColumnEmptyBookList = [["Title", "Author", "Tags", "Null-Tags","Isbn"]]

# print("start")
# #sortCSV(rows)
# print("done")

#======================================
#writes data from FinalFinalList to test.csv
# with open('test.csv', 'w', newline='') as file:
#     writer = csv.writer(file)
#     #writer.writerow(FinalFinalList[x])

#     for x in FinalFinalList:
#         writer.writerow(x)


# with open('emptyBooks.csv', 'w', newline='') as file:
#     writer1 = csv.writer(file)

#     for x in emptyBookList:
#         writer1.writerow(x)

# with open('firstColumnEmptyBookList.csv', 'w', newline='') as file:
#     writer = csv.writer(file)

#     for x in firstColumnEmptyBookList:
#         writer.writerow(x)

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
   
    #print(tempList)
        
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

    #print(BOOKLIST)

    print("End makeBookList") 
#======================================
#input: expects BOOKLIST
#output: alters BOOKLIST[5]
#gets the book tags and isbns into BOOKLIST 
def getBooksTag(bookList):
    # print(BOOKLIST)
    # print("Start getBooksTag")
    # print("\n")
    # print(bookList)
    # print("\n")
    for row in bookList:
        # print("\n")
        # print(row)
        # print("\n")
        tempRow = row[5]
        #print(tempRow)
        tempRow = tempRow.split(',')
        phrase = splitPhrases(tempRow)
        row[4] = phrase
        row[0] = isbn_from_words(row[1])
        row[3] = desc(row[0])
        #print(phrase)
        #===================
        #formatting 
        row.pop()
        row.pop()
        #===================
    print("\n")
    #print(BOOKLIST)
    

        
        

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

# testIsbn = isbn_from_words("the giving tree")
# print("here")
# print(testIsbn)
# #print(desc(testIsbn))
print("done")
print("\n")
#print(BOOKLIST)