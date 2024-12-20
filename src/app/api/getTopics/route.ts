import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

const connectionParameters = {
    host: 'sql.cianci.io',       // Your MySQL host
    user: 'dkim5',  // Your MySQL username
    password: 'tKPokYL@*&t65Zw@', // Your MySQL password
    database: '2024fall_comp367_geffen',  // Your MySQL database name
}

export async function getTopics(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParameters);

    const query = "SELECT * from Topics"; // Change to your actual table name and field

    const [topics] = await connection.execute(query);

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