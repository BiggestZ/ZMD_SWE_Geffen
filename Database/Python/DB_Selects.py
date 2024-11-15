import pymysql, re

def connect_to_db():
    """Establishes a connection to the MySQL database using pymysql."""
    # REMEMBER TO REPLACE THE PASSWORD BEFORE COMMITTING
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='',
            database='geffen_db',
            cursorclass=pymysql.cursors.DictCursor  # Ensures results are returned as dictionaries
        )
        return connection
    except pymysql.MySQLError as err:
        print(f"Error: {err}")
        return None

def search_subtopics(search_term):
    """Search for subtopics and their associated topics."""
    connection = connect_to_db()
    if not connection:
        print("Connection to database failed.")
        return
    try:
        with connection.cursor() as cursor:
            # Define the SQL query to search subtopics and join with topics
            query = """
            SELECT s.SubtopicName,t.TopicName
            FROM Subtopics s
            JOIN Topics t ON s.TopicID = t.TopicID
            WHERE s.SubtopicName LIKE %s;
            """

            # Use wildcards to match any part of the subtopic name
            wildcard_search = f"%{search_term}%"
            
            # Execute the query with the search term
            print("Executing query...")
            cursor.execute(query,(wildcard_search,))

            # Fetch all results
            print("Fetching results...")
            results = cursor.fetchall()
            
            # Print results
            if results:
                print("Search Results:")
                for row in results:
                    print(f"Subtopic: {row['SubtopicName']},Topic: {row['TopicName']}")
            else:
                print("No results found.")
    except pymysql.MySQLError as err:
        print(f"Database error: {err}")
    finally:
        # Close the database connection
        connection.close()

def search_topics(search_term):
    """Search for topics and their associated subtopics."""
    connection = connect_to_db()
    if not connection:
        print("Connection to database failed.")
        return

    try:
        with connection.cursor() as cursor:
            # Define the SQL query to search topics and join with subtopics
            query = """
            SELECT t.TopicName,s.SubtopicName
            FROM Topics t
            LEFT JOIN Subtopics s ON t.TopicID = s.TopicID
            WHERE t.TopicName LIKE %s;
            """

            # Use wildcards to match any part of the topic name
            wildcard_search = f"%{search_term}%"
            
            # Execute the query with the search term
            print("Executing query...")
            cursor.execute(query,(wildcard_search,))

            # Fetch all results
            print("Fetching results...")
            results = cursor.fetchall()
            
            # Print results
            if results:
                print("Search Results:")
                current_topic = None
                for row in results:
                    # Print the topic name only once,followed by its subtopics
                    if row['TopicName'] != current_topic:
                        current_topic = row['TopicName']
                        print(f"\nTopic: {current_topic}")
                    print(f"  - Subtopic: {row['SubtopicName']}" if row['SubtopicName'] else "  - No subtopics")
            else:
                print("No results found.")
    
    except pymysql.MySQLError as err:
        print(f"Database error: {err}")
    finally:
        # Close the database connection
        connection.close()

def search_book_by_title(title):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Books WHERE Title LIKE %s"
            cursor.execute(sql, (f"%{title}%",))
            result = cursor.fetchall()
            
            if result:
                print("Search Results:")
                for book in result:
                    print(f"Title: {book['Title']}")
                    print(f"Author: {book['Author']}")
                    print(f"ISBN: {book['ISBN']}")
                    print(f"Description: {book['BookDesc']}")
                    print("-" * 40)
            else:
                print("No books found with that title.")
    except pymysql.MySQLError as e:
        print(f"Error searching for book: {e}")
    finally:
        connection.close()

# Function to get or verify if a subtopic exists
def get_subtopic_id(subtopic_name, topic_name, connection):
    with connection.cursor() as cursor:
        # Check if topic exists
        cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
        topic = cursor.fetchone()
        
        if not topic:
            print(f"Topic '{topic_name}' does not exist in the database.")
            return None  # Topic does not exist
        
        topic_id = topic['TopicID']

        # Check if subtopic exists and is linked to the topic
        cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s", (subtopic_name, topic_id))
        subtopic = cursor.fetchone()

        if not subtopic:
            print(f"Subtopic '{subtopic_name}' under topic '{topic_name}' does not exist in the database.")
            return None  # Subtopic does not exist
        
        return subtopic['SubtopicID']

# Function to validate author's name
def is_valid_author_name(author):
    # Regular expression to allow only letters and spaces
    return bool(re.match("^[A-Za-z]+$", author))

# Function to add a book with multiple topics and subtopics
def add_book(title, author, isbn, description):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Validate ISBN length
            if len(isbn) != 13 and not isbn.isdigit():
                print("Error: ISBN must be exactly 13 characters long / only numbers.")
                return
            # Checks author's name is valid
            if not is_valid_author_name(author):
                print("Error: Author name can only contain letters and spaces.")
                return

            # Insert the book
            sql = "INSERT INTO Books (Title, Author, ISBN, BookDesc) VALUES (%s, %s, %s, %s)"
            cursor.execute(sql, (title, author, isbn, description))
            connection.commit()
            print(f"Book '{title}' added successfully.")

            # Prompt for topics and subtopics
            while True:
                topic_name = input("Enter topic name (or 'done' to finish): ")
                if topic_name.lower() == 'done':
                    break
                subtopic_name = input("Enter subtopic name (optional, press Enter to skip): ") or topic_name

                # Check if the topic and subtopic exist in the database
                subtopic_id = get_subtopic_id(subtopic_name, topic_name, connection)
                
                # Only link the book if the subtopic exists
                if subtopic_id:
                    cursor.execute("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (%s, %s)", (isbn, subtopic_id))
                    connection.commit()
                    print(f"Linked '{title}' to topic '{topic_name}' and subtopic '{subtopic_name}'.")
                else:
                    print(f"Cannot link '{title}' to topic '{topic_name}' and subtopic '{subtopic_name}' as they are not found in the database.")
                
    except pymysql.MySQLError as e:
        print(f"Error adding book: {e}")
    finally:
        connection.close()

# Function to drop a book and all related subtopics
def drop_book(title_or_isbn):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Find the book by title or ISBN
            cursor.execute("SELECT ISBN FROM Books WHERE Title = %s", (title_or_isbn,))
            book = cursor.fetchone()
            if not book:
                print(f"No book found with title: '{title_or_isbn}'.")
                return
            
            isbn = book['ISBN']

            # Delete all related entries in Book_SubTopics
            cursor.execute("DELETE FROM Book_SubTopics WHERE ISBN = %s", (isbn,))
            print(f"Deleted all subtopic links for book with ISBN {isbn}.")

            # Delete the book itself
            cursor.execute("DELETE FROM Books WHERE ISBN = %s", (isbn,))
            connection.commit()
            print(f"Book with ISBN {isbn} deleted successfully.")

    except pymysql.MySQLError as e:
        print(f"Error dropping book: {e}")
    finally:
        connection.close()

# Edit elements of a Book
# Function to edit a book's details and subtopics based on title or ISBN
# def edit_book(search_term):
#     connection = connect_to_db()
#     try:
#         with connection.cursor() as cursor:
#             # Verify if the book exists
#             try:
#                 cursor.execute("SELECT * FROM Books WHERE Title = %s", (search_term,))
#             except pymysql.MySQLError:
#                 print("Invalid search parameter.")
#                 return
            
#             book = cursor.fetchone()
            
#             if not book:
#                 print(f"No book found with title '{search_term}'.")
#                 return  # Exit if book does not exist

#             print(f"Editing book: {book['Title']} by {book['Author']}")

#             # Prompt for updates on book details
#             new_title = input(f"Enter new title (or leave blank to keep current): ") or book['Title']
#             new_author = input(f"Enter new author (or leave blank to keep current): ") or book['Author']
#             new_isbn = input(f"Enter new ISBN (or leave blank to keep current): ") or book['ISBN']
#             new_description = input(f"Enter new description (or leave blank to keep current): ") or book['BookDesc']

#             # Update the book in the database
#             update_sql = "UPDATE Books SET Title = %s, Author = %s, ISBN = %s, BookDesc = %s WHERE ISBN = %s"
#             cursor.execute(update_sql, (new_title, new_author, new_isbn, new_description, book['ISBN']))
#             connection.commit()
#             print("Book details updated successfully.")

#             # Update subtopics (optional)
#             update_subtopics = input("Would you like to update the subtopics associated with this book? (yes/no): ").lower()
#             if update_subtopics == "yes":
#                 cursor.execute("DELETE FROM Book_SubTopics WHERE ISBN = %s", (book['ISBN'],))
#                 connection.commit()
#                 print("Existing subtopics cleared. Please add new subtopics.")

#                 # Add new subtopics
#                 while True:
#                     topic_name = input("Enter topic name (or 'done' to finish): ")
#                     if topic_name.lower() == 'done':
#                         break
#                     subtopic_name = input("Enter subtopic name (optional, press Enter to skip): ") or topic_name

#                     # Verify subtopic
#                     subtopic_id = get_subtopic_id(subtopic_name, topic_name, connection)
#                     if subtopic_id:
#                         cursor.execute("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (%s, %s)", (book['ISBN'], subtopic_id))
#                         connection.commit()
#                         print(f"Linked '{new_title}' to topic '{topic_name}' and subtopic '{subtopic_name}'.")
#                     else:
#                         print(f"Cannot link '{new_title}' to topic '{topic_name}' and subtopic '{subtopic_name}' as they are not found in the database.")

#     except pymysql.MySQLError as e:
#         print(f"Error updating book: {e}")
#     finally:
#         connection.close()

def edit_book(search_term):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Verify if the book exists
            cursor.execute("SELECT * FROM Books WHERE Title = %s", (search_term,))
            book = cursor.fetchone()
            
            if not book:
                print(f"No book found with title '{search_term}'.")
                return  # Exit if book does not exist

            print(f"Editing book: {book['Title']} by {book['Author']}")

            # Prompt for updates on book details
            new_title = input(f"Enter new title (or leave blank to keep current): ") or book['Title']
            new_author = input(f"Enter new author (or leave blank to keep current): ") or book['Author']
            new_isbn = input(f"Enter new ISBN (or leave blank to keep current): ") or book['ISBN']
            new_description = input(f"Enter new description (or leave blank to keep current): ") or book['BookDesc']

            # Check if the ISBN is changing
            is_isbn_changing = new_isbn != book['ISBN']

            # Disable foreign key checks
            cursor.execute("SET FOREIGN_KEY_CHECKS=0")

            # Update the book in the database
            update_sql = "UPDATE Books SET Title = %s, Author = %s, ISBN = %s, BookDesc = %s WHERE ISBN = %s"
            cursor.execute(update_sql, (new_title, new_author, new_isbn, new_description, book['ISBN']))

            # If the ISBN is changing, update related tables
            if is_isbn_changing:
                update_subtopics_query = "UPDATE Book_SubTopics SET ISBN = %s WHERE ISBN = %s"
                cursor.execute(update_subtopics_query, (new_isbn, book['ISBN']))

                update_language_query = "UPDATE Book_Language SET ISBN = %s WHERE ISBN = %s"
                cursor.execute(update_language_query, (new_isbn, book['ISBN']))

                print(f"ISBN updated from '{book['ISBN']}' to '{new_isbn}' across all related tables.")

            # Re-enable foreign key checks
            cursor.execute("SET FOREIGN_KEY_CHECKS=1")
            connection.commit()
            print("Book details updated successfully.")
# Update subtopics (optional)
            update_subtopics = input("Would you like to update the subtopics associated with this book? (yes/no): ").lower()
            if update_subtopics == "yes":
                action = input("Choose an option:\n1) Delete all existing subtopics and add new ones\n2) Add new subtopics to existing ones\n3) Leave existing subtopics as is\nEnter 1, 2, or 3: ")

                if action == '1':
                    # Delete all subtopics related to the book
                    cursor.execute("DELETE FROM Book_SubTopics WHERE ISBN = %s", (new_isbn,))
                    connection.commit()
                    print("Existing subtopics cleared. Please add new subtopics.")

                    # Add new subtopics
                    while True:
                        topic_name = input("Enter topic name (or 'done' to finish): ")
                        if topic_name.lower() == 'done':
                            break
                        subtopic_name = input("Enter subtopic name (optional, press Enter to skip): ") or topic_name

                        # Verify subtopic
                        subtopic_id = get_subtopic_id(subtopic_name, topic_name, connection)
                        if subtopic_id:
                            cursor.execute("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (%s, %s)", (new_isbn, subtopic_id))
                            connection.commit()
                            print(f"Linked '{new_title}' to topic '{topic_name}' and subtopic '{subtopic_name}'.")
                        else:
                            print(f"Cannot link '{new_title}' to topic '{topic_name}' and subtopic '{subtopic_name}' as they are not found in the database.")

                elif action == '2':
                    # Add additional subtopics without deleting existing ones
                    print("Adding additional subtopics without deleting existing ones.")
                    while True:
                        topic_name = input("Enter topic name (or 'done' to finish): ")
                        if topic_name.lower() == 'done':
                            break
                        subtopic_name = input("Enter subtopic name (optional, press Enter to skip): ") or topic_name

                        # Verify subtopic
                        subtopic_id = get_subtopic_id(subtopic_name, topic_name, connection)
                        if subtopic_id:
                            cursor.execute("INSERT INTO Book_SubTopics (ISBN, SubtopicID) VALUES (%s, %s)", (new_isbn, subtopic_id))
                            connection.commit()
                            print(f"Linked '{new_title}' to topic '{topic_name}' and subtopic '{subtopic_name}'.")
                        else:
                            print(f"Cannot link '{new_title}' to topic '{topic_name}' and subtopic '{subtopic_name}' as they are not found in the database.")

                elif action == '3':
                    print("No changes made to subtopics; existing subtopics are retained.")
                else:
                    print("Invalid choice. No changes made to subtopics.")
    except pymysql.MySQLError as e:
        print(f"Error updating book: {e}")
        connection.rollback()
    finally:
        connection.close()

# Function to search for topics and their associated subtopics
def check_topic_subtopic(topic_name, subtopic_name, connection):
    with connection.cursor() as cursor:
        # Check if topic exists
        cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
        topic = cursor.fetchone()
        
        if not topic:
            print(f"Topic '{topic_name}' does not exist in the database.")
            return None, None  # Topic does not exist

        topic_id = topic['TopicID']

        # Check if subtopic exists and is linked to the topic
        cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s", (subtopic_name, topic_id))
        subtopic = cursor.fetchone()

        if not subtopic:
            print(f"Subtopic '{subtopic_name}' under topic '{topic_name}' does not exist in the database.")
            return topic_id, None  # Subtopic does not exist

        subtopic_id = subtopic['SubtopicID']
        return topic_id, subtopic_id

# Add a new topic
def add_topic(topic_name):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Check if the topic exists
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
            if cursor.fetchone():
                print("Topic already exists.")
                return

            # Insert the new topic
            cursor.execute("INSERT INTO Topics (TopicName) VALUES (%s)", (topic_name,))
            connection.commit()
            print(f"Topic '{topic_name}' added successfully.")
    except pymysql.MySQLError as e:
        print(f"Error adding topic: {e}")
    finally:
        connection.close()

# Edit an existing topic
def edit_topic(old_topic_name, new_topic_name):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Check if the topic exists
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (old_topic_name,))
            topic = cursor.fetchone()
            if not topic:
                print(f"No topic found with the name '{old_topic_name}'.")
                return

            # Update the topic name
            cursor.execute("UPDATE Topics SET TopicName = %s WHERE TopicID = %s", (new_topic_name, topic['TopicID']))
            connection.commit()
            print(f"Topic '{old_topic_name}' updated to '{new_topic_name}'.")
    except pymysql.MySQLError as e:
        print(f"Error editing topic: {e}")
    finally:
        connection.close()

# Delete a topic and associated subtopics
def delete_topic(topic_name):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Check if the topic exists
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
            topic = cursor.fetchone()
            if not topic:
                print(f"No topic found with the name '{topic_name}'.")
                return

            # Delete associated subtopics
            cursor.execute("DELETE FROM Subtopics WHERE TopicID = %s", (topic['TopicID'],))
            # Delete the topic
            cursor.execute("DELETE FROM Topics WHERE TopicID = %s", (topic['TopicID'],))
            connection.commit()
            print(f"Topic '{topic_name}' and its subtopics deleted successfully.")
    except pymysql.MySQLError as e:
        print(f"Error deleting topic: {e}")
    finally:
        connection.close()

# Add a new subtopic under an existing topic
def add_subtopic(topic_name, subtopic_name):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Verify the topic exists
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
            topic = cursor.fetchone()
            if not topic:
                print(f"No topic found with the name '{topic_name}'.")
                return

            # Check if subtopic already exists
            cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s", (subtopic_name, topic['TopicID']))
            if cursor.fetchone():
                print("Subtopic already exists.")
                return

            # Insert the new subtopic
            cursor.execute("INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (%s, %s)", (subtopic_name, topic['TopicID']))
            connection.commit()
            print(f"Subtopic '{subtopic_name}' added under topic '{topic_name}'.")
    except pymysql.MySQLError as e:
        print(f"Error adding subtopic: {e}")
    finally:
        connection.close()

# Find all books related to a given topic
def search_books_by_topic(topic_name):
    connection = connect_to_db()
    if not connection:
        print("Failed to connect to the database.")
        return

    try:
        with connection.cursor() as cursor:
            # Find the topic ID
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
            topic = cursor.fetchone()
            if not topic:
                print(f"No topic found with name '{topic_name}'.")
                return

            # Find all books linked to the topic through subtopics
            cursor.execute("""
                SELECT b.Title, b.Author, b.ISBN, b.BookDesc
                FROM Books b
                JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
                JOIN Subtopics s ON bs.SubtopicID = s.SubtopicID
                WHERE s.TopicID = %s
            """, (topic['TopicID'],))
            books = cursor.fetchall()

            # Display results
            if books:
                print(f"Books related to topic '{topic_name}':")
                for book in books:
                    print(f"Title: {book['Title']}")
                    print(f"Author: {book['Author']}")
                    print(f"ISBN: {book['ISBN']}")
                    print(f"Description: {book['BookDesc']}")
                    print("-" * 40)
            else:
                print(f"No books found related to topic '{topic_name}'.")

    except pymysql.MySQLError as e:
        print(f"Error searching for books: {e}")
    finally:
        connection.close()

# Find all books related to a given subtopic
def search_books_by_subtopic(subtopic_name):
    connection = connect_to_db()
    if not connection:
        print("Failed to connect to the database.")
        return

    try:
        with connection.cursor() as cursor:
            # Find the subtopic ID
            cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s", (subtopic_name,))
            subtopic = cursor.fetchone()
            if not subtopic:
                print(f"No subtopic found with name '{subtopic_name}'.")
                return

            # Find all books linked to the subtopic
            cursor.execute("""
                SELECT b.Title, b.Author, b.ISBN, b.BookDesc
                FROM Books b
                JOIN Book_SubTopics bs ON b.ISBN = bs.ISBN
                WHERE bs.SubtopicID = %s
            """, (subtopic['SubtopicID'],))
            books = cursor.fetchall()

            # Display results
            if books:
                print(f"Books related to subtopic '{subtopic_name}':")
                for book in books:
                    print(f"Title: {book['Title']}")
                    print(f"Author: {book['Author']}")
                    print(f"ISBN: {book['ISBN']}")
                    print(f"Description: {book['BookDesc']}")
                    print("-" * 40)
            else:
                print(f"No books found related to subtopic '{subtopic_name}'.")

    except pymysql.MySQLError as e:
        print(f"Error searching for books: {e}")
    finally:
        connection.close()
# def edit_book(original_isbn, new_title=None, new_author=None, new_isbn=None, new_description=None):
#     connection = connect_to_db()
#     try:
#         with connection.cursor() as cursor:
#             # Start a transaction
#             connection.begin()

#             # Retrieve the current book to check if the ISBN is changing
#             cursor.execute("SELECT * FROM Books WHERE ISBN = %s", (original_isbn,))
#             book = cursor.fetchone()

#             if not book:
#                 print(f"No book found with ISBN '{original_isbn}'.")
#                 connection.rollback()
#                 return

#             # Check if the ISBN is changing
#             is_isbn_changing = new_isbn and new_isbn != original_isbn

#             # Update the Books table
#             update_book_query = """
#                 UPDATE Books 
#                 SET Title = %s, Author = %s, ISBN = %s, BookDesc = %s 
#                 WHERE ISBN = %s
#             """
#             cursor.execute(update_book_query, (
#                 new_title or book['Title'],
#                 new_author or book['Author'],
#                 new_isbn or original_isbn,
#                 new_description or book.get('BookDesc'),
#                 original_isbn,
#             ))

#             # If the ISBN is changing, update related tables
#             if is_isbn_changing:
#                 # Update Book_SubTopics table
#                 update_subtopics_query = "UPDATE Book_SubTopics SET ISBN = %s WHERE ISBN = %s"
#                 cursor.execute(update_subtopics_query, (new_isbn, original_isbn))

#                 # Update Book_Language table
#                 update_language_query = "UPDATE Book_Language SET ISBN = %s WHERE ISBN = %s"
#                 cursor.execute(update_language_query, (new_isbn, original_isbn))

#                 print(f"ISBN updated from '{original_isbn}' to '{new_isbn}' across all related tables.")
#             else:
#                 print("Book information updated without changing ISBN.")

#             # Commit the transaction if all queries succeed
#             connection.commit()
#             print("Book details updated successfully.")

#     except pymysql.MySQLError as e:
#         print(f"Error updating book: {e}")
#         connection.rollback()

#     finally:
#         connection.close()

# Zahir Solution
def edit_subtopic(topic_name, old_subtopic_name, new_subtopic_name):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Verify the topic exists
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
            topic = cursor.fetchone()
            if not topic:
                print(f"No topic found with the name '{topic_name}'.")
                return

            # Check if the subtopic exists
            cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s", (old_subtopic_name, topic['TopicID']))
            subtopic = cursor.fetchone()
            if not subtopic:
                print(f"No subtopic found with the name '{old_subtopic_name}' under topic '{topic_name}'.")
                return

            # Update the subtopic name
            cursor.execute("UPDATE Subtopics SET SubtopicName = %s WHERE SubtopicID = %s", (new_subtopic_name, subtopic['SubtopicID']))
            connection.commit()
            print(f"Subtopic '{old_subtopic_name}' updated to '{new_subtopic_name}' under topic '{topic_name}'.")

            # Prompt user for action on additional subtopics
            action = input("Do you want to (1) delete all existing subtopics and add new ones or (2) add new subtopics without deleting? (Enter 1 or 2): ")

            if action == '1':
                # Delete all subtopics related to the topic
                cursor.execute("DELETE FROM Subtopics WHERE TopicID = %s", (topic['TopicID'],))
                connection.commit()
                print(f"All subtopics under topic '{topic_name}' have been deleted. Please add new subtopics.")

                # Add new subtopics
                while True:
                    new_subtopic_name = input("Enter new subtopic name (or 'done' to finish): ")
                    if new_subtopic_name.lower() == 'done':
                        break
                    cursor.execute("INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (%s, %s)", (new_subtopic_name, topic['TopicID']))
                    connection.commit()
                    print(f"Subtopic '{new_subtopic_name}' added under topic '{topic_name}'.")

            elif action == '2':
                # Add additional subtopics without deleting existing ones
                while True:
                    additional_subtopic_name = input("Enter additional subtopic name (or 'done' to finish): ")
                    if additional_subtopic_name.lower() == 'done':
                        break
                    cursor.execute("INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (%s, %s)", (additional_subtopic_name, topic['TopicID']))
                    connection.commit()
                    print(f"Additional subtopic '{additional_subtopic_name}' added under topic '{topic_name}'.")

            else:
                print("Invalid choice. No changes made to subtopics.")

    except pymysql.MySQLError as e:
        print(f"Error editing subtopic: {e}")
        connection.rollback()
    finally:
        connection.close()

# Edit an existing subtopic
# def edit_subtopic(topic_name, old_subtopic_name, new_subtopic_name):
#     connection = connect_to_db()
#     try:
#         with connection.cursor() as cursor:
#             # Verify the topic exists
#             cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
#             topic = cursor.fetchone()
#             if not topic:
#                 print(f"No topic found with the name '{topic_name}'.")
#                 return

#             # Check if the subtopic exists
#             cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s", (old_subtopic_name, topic['TopicID']))
#             subtopic = cursor.fetchone()
#             if not subtopic:
#                 print(f"No subtopic found with the name '{old_subtopic_name}' under topic '{topic_name}'.")
#                 return

#             # Update the subtopic name
#             cursor.execute("UPDATE Subtopics SET SubtopicName = %s WHERE SubtopicID = %s", (new_subtopic_name, subtopic['SubtopicID']))
#             connection.commit()
#             print(f"Subtopic '{old_subtopic_name}' updated to '{new_subtopic_name}' under topic '{topic_name}'.")
#     except pymysql.MySQLError as e:
#         print(f"Error editing subtopic: {e}")
#     finally:
#         connection.close()

# # Delete a specific subtopic under a given topic
def delete_subtopic(topic_name, subtopic_name):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Verify the topic exists
            cursor.execute("SELECT TopicID FROM Topics WHERE TopicName = %s", (topic_name,))
            topic = cursor.fetchone()
            if not topic:
                print(f"No topic found with the name '{topic_name}'.")
                return

            # Check if the subtopic exists
            cursor.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = %s AND TopicID = %s", (subtopic_name, topic['TopicID']))
            subtopic = cursor.fetchone()
            if not subtopic:
                print(f"No subtopic found with the name '{subtopic_name}' under topic '{topic_name}'.")
                return

            # Delete the subtopic
            cursor.execute("DELETE FROM Subtopics WHERE SubtopicID = %s", (subtopic['SubtopicID'],))
            connection.commit()
            print(f"Subtopic '{subtopic_name}' under topic '{topic_name}' deleted successfully.")
    except pymysql.MySQLError as e:
        print(f"Error deleting subtopic: {e}")
    finally:
        connection.close()

def get_subtopics_for_book(book_title):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Get the ISBN for the given book title
            cursor.execute("SELECT ISBN FROM Books WHERE Title = %s", (book_title,))
            book = cursor.fetchone()
            
            if not book:
                print(f"No book found with title '{book_title}'.")
                return []

            # Get subtopics linked to this ISBN
            cursor.execute("""
                SELECT s.SubtopicName
                FROM Subtopics s
                JOIN Book_SubTopics bs ON s.SubtopicID = bs.SubtopicID
                WHERE bs.ISBN = %s
            """, (book['ISBN'],))
            
            subtopics = cursor.fetchall()
            
            # Return a list of subtopic names
            return [subtopic['SubtopicName'] for subtopic in subtopics] if subtopics else []

    except pymysql.MySQLError as e:
        print(f"Database error: {e}")
        return []
    finally:
        connection.close()

def get_topics_for_book(book_title):
    connection = connect_to_db()
    try:
        with connection.cursor() as cursor:
            # Get the ISBN for the given book title
            cursor.execute("SELECT ISBN FROM Books WHERE Title = %s", (book_title,))
            book = cursor.fetchone()
            
            if not book:
                print(f"No book found with title '{book_title}'.")
                return []

            # Get topics linked to this ISBN through subtopics
            cursor.execute("""
                SELECT DISTINCT t.TopicName
                FROM Topics t
                JOIN Subtopics s ON t.TopicID = s.TopicID
                JOIN Book_SubTopics bs ON s.SubtopicID = bs.SubtopicID
                WHERE bs.ISBN = %s
            """, (book['ISBN'],))
            
            topics = cursor.fetchall()
            
            # Return a list of topic names
            return [topic['TopicName'] for topic in topics] if topics else []

    except pymysql.MySQLError as e:
        print(f"Database error: {e}")
        return []
    finally:
        connection.close()

# Command-line interface for testing
if __name__ == "__main__":
    action = input("Enter action (add, drop, edit, search, add_subtopic, drop_subtopic, edit_subtopic, search_subtopic): ").strip().lower()

    if action == "add":
        title = input("Enter title: ")
        author = input("Enter author: ")
        isbn = input("Enter ISBN: ")
        description = input("Enter description: ")
        add_book(title, author, isbn, description)

    elif action == "drop":
        title = input("Enter title of book to drop: ")
        drop_book(title)

    elif action == "edit":
        title = input("Enter title of book to edit: ")
        # new_title = input("Enter new title (or leave blank to keep current): ") or None
        # new_author = input("Enter new author (or leave blank to keep current): ") or None
        # new_isbn = input("Enter new ISBN (or leave blank to keep current): ") or None
        # new_description = input("Enter new description (or leave blank to keep current): ") or None
        edit_book(title)
    
    elif action == "search":
        title = input("Enter title to search for: ")
        search_book_by_title(title)
    
    elif action == "add_subtopic":
        topic_name = input("Enter topic name: ")
        subtopic_name = input("Enter subtopic name: ")
        add_subtopic(topic_name, subtopic_name)
    
    elif action == "edit_subtopic":
        old_subtopic_name = input("Enter old subtopic name: ")
        topic_name = input("Enter topic name: ")
        subtopic_name = input("Enter subtopic name: ")
        edit_subtopic(topic_name,old_subtopic_name,subtopic_name)
    
    elif action == "drop_subtopic":
        topic_name = input("Enter topic name: ")
        subtopic_name = input("Enter subtopic name: ")
        delete_subtopic(topic_name, subtopic_name)
    
    elif action == "search_subtopic":
        search_term = input("Enter search term for subtopic: ")
        search_subtopics(search_term)

    elif action == "test":
        search_term = input("Enter search subtopic to find books: ")
        search_books_by_subtopic(search_term)

    elif action == "test2":
        search_term = input("Enter search topic to find books: ")
        search_books_by_topic(search_term)

    else:
        print("Invalid action. Please choose 'add', 'drop', or 'edit'.") 
