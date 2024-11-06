-- This is where all the Testing will occur
INSERT INTO Books (ISBN,Title,Author,PublicationYear)
VALUES ('978-3-16-148410-0','Children of the World','Jane Doe',2020),
       ('978-0-12-345678-9','Family Adventures','John Smith',2021),›
       ('978-1-23-456789-7','Learning about Cultures','Emily White',2019);

INSERT INTO Topics (TopicName)
VALUES ('Culture'),('Family'),('Adventure');

INSERT INTO Book_Topics (ISBN,TopicID)
VALUES ('978-3-16-148410-0',1), -- Children of the World related to Culture
       ('978-3-16-148410-0',2), -- Children of the World related to Family
       ('978-0-12-345678-9',2), -- Family Adventures related to Family
       ('978-0-12-345678-9',3), -- Family Adventures related to Adventure
       ('978-1-23-456789-7',1);  -- Learning about Cultures related to Culture