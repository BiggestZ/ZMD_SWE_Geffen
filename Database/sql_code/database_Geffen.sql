-- Where the database is created and the tables are created
-- This is the backup incase someone messses up
CREATE DATABASE Geffen_db;
USE Geffen_db;
CREATE TABLE Books (
    ISBN VARCHAR(13) PRIMARY KEY,
    Title VARCHAR(500),
    Author VARCHAR(255)
    -- PublicationYear INT
    BookDesc LONGTEXT -- Not implemented yet
);

CREATE TABLE Topics (
    TopicID INT PRIMARY KEY AUTO_INCREMENT, -- Auto-incrementing primary key
    TopicName VARCHAR(100) UNIQUE  -- Topic names should be unique
);

CREATE TABLE Subtopics (
    SubtopicID INT PRIMARY KEY AUTO_INCREMENT, -- Auto-incrementing primary key
    SubtopicName VARCHAR(100) UNIQUE, -- Subtopic names should be unique
    TopicID INT, -- Foreign key to the Topics table
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID)
);

-- Change this,link books to subtopics
CREATE TABLE Book_SubTopics (
    ISBN VARCHAR(13), -- Foreign key to the Books table
    SubtopicID INT,      -- Foreign key to the Topics table
    PRIMARY KEY (ISBN,SubtopicID), -- Composite primary key (both ISBN and TopicID)
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (SubtopicID) REFERENCES Subtopics(SubtopicID)
);

CREATE TABLE Language (
    LanguageID INT PRIMARY KEY AUTO_INCREMENT, -- Auto-incrementing primary key
    LanguageName VARCHAR(100) UNIQUE -- Language names should be unique
);

CREATE TABLE Books_Language (
    ISBN VARCHAR(13), -- Foreign key to the Books table
    LanguageID INT, -- Foreign key to the Language table
    PRIMARY KEY (ISBN,LanguageID), -- Composite primary key (both ISBN and LanguageID)
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (LanguageID) REFERENCES Language(LanguageID)
);

