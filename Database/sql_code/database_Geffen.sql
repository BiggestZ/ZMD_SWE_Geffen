-- Where the database is created and the tables are created
CREATE DATABASE Geffen_db;
USE Geffen_db;
CREATE TABLE Books (
    ISBN VARCHAR(13) PRIMARY KEY,
    Title VARCHAR(500),
    Author VARCHAR(255)
    -- PublicationYear INT
);

CREATE TABLE Topics (
    TopicID INT PRIMARY KEY AUTO_INCREMENT,  -- Auto-incrementing primary key
    TopicName VARCHAR(100) UNIQUE  -- Topic names should be unique
);

CREATE TABLE Book_Topics (
    ISBN VARCHAR(13),  -- Foreign key to the Books table
    TopicID INT,       -- Foreign key to the Topics table
    PRIMARY KEY (ISBN, TopicID),  -- Composite primary key (both ISBN and TopicID)
    FOREIGN KEY (ISBN) REFERENCES Books(ISBN),
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID)
);

CREATE TABLE Subtopics (
    SubtopicID INT PRIMARY KEY AUTO_INCREMENT,  -- Auto-incrementing primary key
    SubtopicName VARCHAR(100) UNIQUE,  -- Subtopic names should be unique
    TopicID INT,  -- Foreign key to the Topics table
    FOREIGN KEY (TopicID) REFERENCES Topics(TopicID)
);


