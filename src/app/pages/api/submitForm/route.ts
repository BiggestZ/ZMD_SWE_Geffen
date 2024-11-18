
export const API_ROUTES = {

    SUBMIT_FORM: 'pages/api/submitForm/',
    
  };

import connectToDb from '@/app/components/connectToDB';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const connection = await connectToDb()
    if(!connection) return;
    const body = await req.json();
    const { isbn, title, author, tags } = body;

    if (!isbn || !title || !author || !tags) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    console.log('Received data route.ts:', { isbn, title, author, tags });
    // Log the received data (database logic here)
    // 
    await connection.execute(
      "INSERT INTO Books (Title, Author, ISBN, Description) VALUES (?, ?, ?, ?)",
      [title, author, isbn]
  );

    return NextResponse.json({ message: 'Form data saved successfully!' });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}


