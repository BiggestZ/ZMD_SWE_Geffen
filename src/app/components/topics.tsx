// Import the connectToDb function from the db module
import connectToDb from './connectToDB';
import mysql from 'mysql2/promise';

// Function to search topics and subtopics in the database
async function searchTopics(searchTerm: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) {
        console.log("Connection to database failed.");
        return;
    }

    try {
        // Define the SQL query to search topics and join with subtopics
        const query = `
            SELECT t.TopicName, s.SubtopicName
            FROM Topics t
            LEFT JOIN Subtopics s ON t.TopicID = s.TopicID
            WHERE t.TopicName LIKE ?;
        `;

        // Use wildcards to match any part of the topic name
        const wildcardSearch = `%${searchTerm}%`;

        // Execute the query with the search term
        console.log("Executing query...");
        const [results] = await connection.execute(query, [wildcardSearch]);

        // Process and print results
        if ((results as any[]).length > 0) {
            console.log("Search Results:");
            let currentTopic: string | null = null;
            for (const row of results as any[]) {
                // Print the topic name only once, followed by its subtopics
                if (row.TopicName !== currentTopic) {
                    currentTopic = row.TopicName;
                    console.log(`\nTopic: ${currentTopic}`);
                }
                console.log(row.SubtopicName ? `  - Subtopic: ${row.SubtopicName}` : "  - No subtopics");
            }
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error(`Database error: ${(error as Error).message}`);
    } finally {
        // Close the database connection
        connection.end();
    }
}

// Function to add a new topic to the database
async function addTopic(topicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        // Check if the topic exists
        const [existingTopic] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        if ((existingTopic as any[]).length > 0) {
            console.log("Topic already exists.");
            return;
        }

        // Insert the new topic
        await connection.execute(
            "INSERT INTO Topics (TopicName) VALUES (?)",
            [topicName]
        );
        await connection.commit();
        console.log(`Topic '${topicName}' added successfully.`);
    } catch (error) {
        console.error(`Error adding topic: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}

// Function to edit a topic in the database
async function editTopic(oldTopicName: string, newTopicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        // Check if the topic exists
        const [topicResult] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [oldTopicName]
        );

        const topic = (topicResult as any[])[0];
        if (!topic) {
            console.log(`No topic found with the name '${oldTopicName}'.`);
            return;
        }

        // Update the topic name
        await connection.execute(
            "UPDATE Topics SET TopicName = ? WHERE TopicID = ?",
            [newTopicName, topic.TopicID]
        );
        await connection.commit();
        console.log(`Topic '${oldTopicName}' updated to '${newTopicName}'.`);
    } catch (error) {
        console.error(`Error editing topic: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}

// Function to delete a topic and its associated subtopics
async function deleteTopic(topicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        // Check if the topic exists
        const [topicResult] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        const topic = (topicResult as any[])[0];
        if (!topic) {
            console.log(`No topic found with the name '${topicName}'.`);
            return;
        }

        // Delete associated subtopics
        await connection.execute("DELETE FROM Subtopics WHERE TopicID = ?", [topic.TopicID]);

        // Delete the topic
        await connection.execute("DELETE FROM Topics WHERE TopicID = ?", [topic.TopicID]);
        await connection.commit();

        console.log(`Topic '${topicName}' and its subtopics deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting topic: ${(error as Error).message}`);
    } finally {
        await connection.end();
    }
}

// Export all functions in file
export { searchTopics, addTopic, editTopic, deleteTopic};