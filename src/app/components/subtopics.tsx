import connectToDb from './connectToDB';
import mysql, {RowDataPacket} from 'mysql2/promise';

interface Book {
    title: string;
    author: string;
    isbn: string;
    description: string;
    language: string;
}

// Create an interface to store the topic and subtopic IDs
interface TopicSubtopicIds {
    topicId: number | null;
    subtopicId: number | null;
}

// Function to search for subtopics
async function searchSubtopics(searchTerm: string) {
    const connection = await connectToDb();
    if (!connection) return;

    try {
        const query = `
            SELECT s.SubtopicName, t.TopicName
            FROM Subtopics s
            JOIN Topics t ON s.TopicID = t.TopicID
            WHERE s.SubtopicName LIKE ?;
        `;
        const [rows, fields]: [any[], any] = await connection.execute(query, [`%${searchTerm}%`]); // Use the searchTerm to search for subtopics
        
        if (rows.length > 0) { 
            console.log("Search Results:");
            rows.forEach((row: { SubtopicName: string; TopicName: string }) => {
                console.log(`Subtopic: ${row.SubtopicName}, Topic: ${row.TopicName}`);
            });
        } else {
            console.log("No results found.");
        }
    } catch (error) {
        console.error("Database error:", error);
    } finally {
        await connection.end();
    }
}
// Check if a subtopic exists under a topic
async function checkTopicSubtopic(topicName: string, subtopicName: string, connection: mysql.Connection): Promise<TopicSubtopicIds> {
    try {
        // Check if topic exists
        const [topicRows] = await connection.execute("SELECT TopicID FROM Topics WHERE TopicName = ?", [topicName]);
        const topic = (topicRows as any[])[0];

        // If topic does not exist, return null
        if (!topic) {
            console.log(`Topic '${topicName}' does not exist in the database.`);
            return { topicId: null, subtopicId: null }; // Topic does not exist
        }
        
        // Get the topic ID
        const topicId = topic.TopicID;

        // Check if subtopic exists and is linked to the topic
        const [subtopicRows] = await connection.execute("SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ? AND TopicID = ?", [subtopicName, topicId]);
        const subtopic = (subtopicRows as any[])[0];

        // If subtopic does not exist, return null
        if (!subtopic) {
            console.log(`Subtopic '${subtopicName}' under topic '${topicName}' does not exist in the database.`);
            return { topicId, subtopicId: null }; // Subtopic does not exist
        }

        // Set the subtopic ID
        const subtopicId = subtopic.SubtopicID;
        return { topicId, subtopicId };
    } catch (error) {
        console.error("Database error:", error);
        return { topicId: null, subtopicId: null };
    }
}

// Function to add a subtopic under an existing topic
async function addSubtopic(topicName: string, subtopicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        // Verify the topic exists
        const [topicResult] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        const topic = (topicResult as any[])[0];
        if (!topic) {
            console.log(`No topic found with the name '${topicName}'.`);
            return;
        }

        // Check if subtopic already exists
        const [subtopicResult] = await connection.execute(
            "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ? AND TopicID = ?",
            [subtopicName, topic.TopicID]
        );

        if ((subtopicResult as any[]).length > 0) {
            console.log("Subtopic already exists.");
            return;
        }

        // Insert the new subtopic
        await connection.execute(
            "INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (?, ?)",
            [subtopicName, topic.TopicID]
        );

        console.log(`Subtopic '${subtopicName}' added under topic '${topicName}'.`);
    } catch (error) {
        console.error(`Error adding subtopic: ${(error as Error).message}`);
    } finally {
        connection.end();
    }
}

// Function to edit a subtopic
async function editSubtopic(topicName: string, oldSubtopicName: string, newSubtopicName: string): Promise<void> {
    const connection = await connectToDb();
    if (!connection) return;
    try {
        // Verify the topic exists
        const [topicResult] = await connection.execute("SELECT TopicID FROM Topics WHERE TopicName = ?", [topicName]);
        const topic = (topicResult as any[])[0];
        if (!topic) {
            console.log(`No topic found with the name '${topicName}'.`);
            return;
        }

        // Check if the subtopic exists
        const [subtopicResult] = await connection.execute(
            "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ? AND TopicID = ?",
            [oldSubtopicName, topic.TopicID]
        );
        const subtopic = (subtopicResult as any[])[0];
        if (!subtopic) {
            console.log(`No subtopic found with the name '${oldSubtopicName}' under topic '${topicName}'.`);
            return;
        }

        // Update the subtopic name
        await connection.execute(
            "UPDATE Subtopics SET SubtopicName = ? WHERE SubtopicID = ?",
            [newSubtopicName, subtopic.SubtopicID]
        );
        console.log(`Subtopic '${oldSubtopicName}' updated to '${newSubtopicName}' under topic '${topicName}'.`);

        // Prompt user for action on additional subtopics
        const action = await prompt("Do you want to (1) delete all existing subtopics and add new ones or (2) add new subtopics without deleting? (Enter 1 or 2): ");

        if (action === '1') {
            // Delete all subtopics related to the topic
            await connection.execute("DELETE FROM Subtopics WHERE TopicID = ?", [topic.TopicID]);
            console.log(`All subtopics under topic '${topicName}' have been deleted. Please add new subtopics.`);

            // Add new subtopics
            while (true) {
                const newSubtopic = await prompt("Enter new subtopic name (or 'done' to finish): ");
                if (newSubtopic.toLowerCase() === 'done') break;

                await connection.execute(
                    "INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (?, ?)",
                    [newSubtopic, topic.TopicID]
                );
                console.log(`Subtopic '${newSubtopic}' added under topic '${topicName}'.`);
            }
        } else if (action === '2') {
            // Add additional subtopics without deleting existing ones
            while (true) {
                const additionalSubtopic = await prompt("Enter additional subtopic name (or 'done' to finish): ");
                if (additionalSubtopic.toLowerCase() === 'done') break;

                await connection.execute(
                    "INSERT INTO Subtopics (SubtopicName, TopicID) VALUES (?, ?)",
                    [additionalSubtopic, topic.TopicID]
                );
                console.log(`Additional subtopic '${additionalSubtopic}' added under topic '${topicName}'.`);
            }
        } else {
            console.log("Invalid choice. No changes made to subtopics.");
        }
    } catch (error) {
        console.error(`Error editing subtopic: ${(error as Error).message}`);
        await connection.rollback();
    } finally {
        await connection.end();
    }
}

// Helper function for prompting user input in Node.js
async function prompt(question: string): Promise<string> {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => readline.question(question, (answer: string) => {
        readline.close();
        resolve(answer);
    }));
}

// Function to delete a subtopic
async function deleteSubtopic(topicName: string, subtopicName: string): Promise<void> {
    const connection = await connectToDb(); // Establish database connection
    if (!connection) {
        console.error("Failed to connect to the database.");
        return;
    }

    try {
        // Verify the topic exists
        const [topicResults] = await connection.execute(
            "SELECT TopicID FROM Topics WHERE TopicName = ?",
            [topicName]
        );

        if ((topicResults as any[]).length === 0) {
            console.log(`No topic found with the name '${topicName}'.`);
            return;
        }

        const topicId = (topicResults as any[])[0].TopicID;

        // Check if the subtopic exists
        const [subtopicResults] = await connection.execute(
            "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ? AND TopicID = ?",
            [subtopicName, topicId]
        );

        if ((subtopicResults as any[]).length === 0) {
            console.log(`No subtopic found with the name '${subtopicName}' under topic '${topicName}'.`);
            return;
        }

        const subtopicId = (subtopicResults as any[])[0].SubtopicID;

        // Remove associations of the subtopic with books
        await connection.execute(
            "DELETE FROM Book_SubTopics WHERE SubtopicID = ?",
            [subtopicId]
        );
        console.log(`Removed associations of subtopic '${subtopicName}' with all books.`);

        // Delete the subtopic itself
        await connection.execute(
            "DELETE FROM Subtopics WHERE SubtopicID = ?",
            [subtopicId]
        );
        console.log(`Subtopic '${subtopicName}' under topic '${topicName}' deleted successfully.`);

    } catch (error) {
        console.error(`Error deleting subtopic: ${(error as Error).message}`);
    } finally {
        await connection.end(); // Close the database connection
    }
}

export default deleteSubtopic;


// Currently have them check for topic, then subtopic. Could look to skip this.
async function getSubtopicId(subtopicName: string, connection: mysql.Connection): Promise<number | null> {
    try {
        // Search for the subtopic directly in the Subtopics table
        const [subtopicResult] = await connection.execute(
            "SELECT SubtopicID FROM Subtopics WHERE SubtopicName = ?",
            [subtopicName]
        );

        const subtopic = (subtopicResult as any[])[0];
        if (!subtopic) {
            console.log(`Subtopic '${subtopicName}' does not exist in the database.`);
            return null; // Subtopic does not exist
        }

        return subtopic.SubtopicID;
    } catch (error) {
        console.error(`Error retrieving subtopic ID: ${(error as Error).message}`);
        return null;
    }
}


// Export all of the functions
export { searchSubtopics, deleteSubtopic, checkTopicSubtopic, addSubtopic, editSubtopic, getSubtopicId };
