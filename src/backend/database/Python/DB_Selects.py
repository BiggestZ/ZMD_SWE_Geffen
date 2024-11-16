import pymysql, flask

def connect_to_db():
    """Establishes a connection to the MySQL database using pymysql."""
    # REMEMBER TO REPLACE THE PASSWORD BEFORE COMMITTING
    try:
        connection = pymysql.connect(
            host='sql.cianci.io',
            user='',
            password='', # Will fill in when needed
            database='2024fall_comp367_geffen',
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

# Example usage
search_term = input("Enter a topic search term: ")
search_topics(search_term)

'''# Example usage
search_term = input("Enter a subtopic search term: ")
search_subtopics(search_term)'''
