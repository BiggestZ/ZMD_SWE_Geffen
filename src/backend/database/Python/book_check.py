import pymysql


subtopics = []
subtopics_ID = []

def connect_to_db():
    """Establishes a connection to the MySQL database using pymysql."""
    # REMEMBER TO REPLACE THE PASSWORD BEFORE COMMITTING
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='', # Will fill in when needed
            database='geffen_db',
        )
        return connection
    except pymysql.MySQLError as err:
        print(f"Error: {err}")
        return None
    

def find_subtopics_for_book(connection, book_name):
    try:
        cursor = connection.cursor()

        # Step 1: Find the ISBN for the given book name
        cursor.execute("SELECT ISBN FROM books WHERE title = %s", (book_name,))
        result = cursor.fetchone()
        print("Result:", result)
            
        if result:
            isbn = result[0]
            print("ISBN:", isbn)
            # Step 2: Find all subtopics associated with this ISBN
            cursor.execute("SELECT SubtopicID FROM book_subtopics WHERE ISBN = %s", (isbn,))
            subtopics_ID = [row[0] for row in cursor.fetchall()]
            print("Subtopics ID:", subtopics_ID)
            for sub in subtopics_ID:
                cursor.execute("SELECT SubtopicName FROM Subtopics WHERE SubtopicID = %s", (sub,))
                tuple = cursor.fetchall()
                str_tup = str(tuple[0])
                str_tup = str_tup.replace("(", "").replace(")", "").replace(",", "").replace("'", "")
                #print(str(cursor.fetchall()))
                subtopics.append(str_tup)
        else:
            print("Book not found.")

    except pymysql.MySQLError as e:
        print(f"Database error: {e}")

    finally:
        if cursor:
            cursor.close()
    return subtopics


# Example usage
connection = connect_to_db()
book_name = "a friend like you"
related_subtopics = find_subtopics_for_book(connection, book_name)
print("Related Subtopics:", related_subtopics)