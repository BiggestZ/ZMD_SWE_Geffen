// pages/api/getTopics.ts (or whatever file path fits your Next.js structure)

import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// Create MySQL connection parameters (ensure these are securely managed)
const connectionParameters = {
    host: 'sql.cianci.io',       // Your MySQL host
    user: 'dkim5',  // Your MySQL username
    password: 'tKPokYL@*&t65Zw@', // Your MySQL password
    database: '2024fall_comp367_geffen',  // Your MySQL database name
};

export async function getTopics(request: NextRequest) {
  try {
    // Create a MySQL connection
    const connection = await mysql.createConnection(connectionParameters);

    // SQL query to fetch all topics
    const query = "SELECT * from Topics"; // Change to your actual table name and field

    // Execute the query and retrieve the results
    const [topics] = await connection.execute(query);

    // Return the list of topics as a JSON response
    return NextResponse.json(topics);
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    // Return an error message if something goes wrong
    const response = {
      error: (err as Error).message,
      returnedStatus: 500,  // HTTP status code for error
    };

    // Return the error message with status code 500
    return NextResponse.json(response, { status: 500 });
  }
}
