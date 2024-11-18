// Function to connect to the database
import mysql from 'mysql2/promise';

interface ConnectionParams { 
    host: string;
    user: string;
    password: string;
    database: string;
}

// Database connection function
async function connectToDb(): Promise<mysql.Connection | null> { // Replace these with your own database connection parameters
    // Connection parameters
    const connectionParameters: ConnectionParams = {
        host: 'sql.cianci.io',      
        user: 'dkim5',
        password: 'tKPokYL@*&t65Zw@',
        database: '2024fall_comp367_geffen',
    };

    try {
        const connection = await mysql.createConnection(connectionParameters);
        console.log("Connected to the database successfully.");
        return connection;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return null;
    }
}

export default connectToDb;
