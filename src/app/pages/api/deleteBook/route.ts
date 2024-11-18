// import { NextResponse } from 'next/server';
// import mysql from 'mysql2/promise';

// // Configure your MySQL connection
// const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export async function DELETE(req: Request) {
//   try {
//     const { title } = await req.json();

//     if (!title) {
//       return NextResponse.json({ message: 'Missing required field: title' }, { status: 400 });
//     }

//     const query = 'DELETE FROM books WHERE title = ?';
//     const [result] = await db.execute(query, [title]);

//     if (result.affectedRows > 0) {
//       return NextResponse.json({ message: 'Book deleted successfully!' });
//     } else {
//       return NextResponse.json({ message: 'Book not found.' }, { status: 404 });
//     }
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }
