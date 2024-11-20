import connectToDb from "./connectToDB";
import mysql from "mysql2/promise";

// add a new language to the database
export async function addLanguage(language: string): Promise<boolean> {
    const connection = await connectToDb();
    if (connection === null) {
        return false;
    }
    try {
        const query = "INSERT INTO languages (language) VALUES (?)";
        const [rows] = await connection.query(query, [language]);
        console.log("Added language to the database:", language);
        return true;
    } catch (error) {
        console.error("Error adding language to the database:", error);
        return false;
    } finally {
        await connection.end();
    }
}

// delete a language from the database
export async function deleteLanguage(language: string): Promise<boolean> {
    const connection = await connectToDb();
    if (connection === null) {
        return false;
    }
    try {
        const query = "DELETE FROM languages WHERE language = ?";
        const [rows] = await connection.query(query, [language]);
        console.log("Deleted language from the database:", language);
        return true;
    } catch (error) {
        console.error("Error deleting language from the database:", error);
        return false;
    } finally {
        await connection.end();
    }
}