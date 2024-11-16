'use client'
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the handler for the API route
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log('HERE: handler');
    const { isbn, title, author, tags } = req.body;

    // Validate received data (optional)
    if (!isbn || !title || !author || !tags) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log the received data (replace with database logic if needed)
    console.log('Received data:', { isbn, title, author, tags });

    // Respond with a success message
    return res.status(200).json({ message: 'Form data saved successfully!' });
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import mysql from 'mysql2/promise';

// // Create MySQL connection parameters (ensure these are securely managed)
// const connectionParameters = {
//     host: 'sql.cianci.io',       // Your MySQL host
//     user: 'dkim5',  // Your MySQL username
//     password: 'tKPokYL@*&t65Zw@', // Your MySQL password
//     database: '2024fall_comp367_geffen',  // Your MySQL database name
// };

// export async function submitForm(request: NextRequest) {
//   try {
//     // Create a MySQL connection
//     const connection = await mysql.createConnection(connectionParameters);

//     // SQL query to fetch all topics
//     const query = "SELECT * from Topics"; // Change to your actual table name and field

//     // Execute the query and retrieve the results
//     const [topics] = await connection.execute(query);

//     // Return the list of topics as a JSON response
//     return NextResponse.json(topics);
//   } catch (err) {
//     console.log('ERROR: API - ', (err as Error).message);

//     // Return an error message if something goes wrong
//     const response = {
//       error: (err as Error).message,
//       returnedStatus: 500,  // HTTP status code for error
//     };

//     // Return the error message with status code 500
//     return NextResponse.json(response, { status: 500 });
//   }
// }





// 'use client'
// import type { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Check if the request method is POST
//   if (req.method === 'POST') {
//     const { isbn, title, author, tags } = req.body;

//     // Validate the required fields
//     if (!isbn || !title || !author || !tags) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }

//     // Log the data (replace with your database logic)
//     console.log('Form data received:', { isbn, title, author, tags });

//     // Send a success response
//     return res.status(200).json({ message: 'Form data saved successfully!' });
//   } else {
//     // Handle unsupported methods (like GET, PUT, DELETE, etc.)
//     res.setHeader('Allow', ['POST']);
//     return res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// }
