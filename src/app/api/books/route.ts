import { NextResponse, NextRequest } from "next/server";
import mysql from 'mysql2/promise';

export const connectionParameters = {
    host: 'sql.cianci.io',       // Your MySQL host
    user: 'acheng2',  // Your MySQL username
    password: 'cl6g*t5URndDuZxe', // Your MySQL password
    database: '2024fall_comp367_geffen',  // Your MySQL database name
}

export async function GET (request : NextRequest) {
    try {
        const connection = await mysql.createConnection(connectionParameters)

            let query = 'SELECT * FROM Books'

            const [books] = await connection.execute(query)

            return NextResponse.json(books)
            
    } catch(err) {
        console.log('ERROR: API - ', (err as Error).message)
        
        const response = {
            error: (err as Error).message,

            returnedStatus: 200,
        }

        return NextResponse.json(response, { status: 200 })
    }
}
