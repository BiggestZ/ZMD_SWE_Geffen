import { NextResponse } from 'next/server';

import connectToDB from "../../../components/connectToDB"


export async function PUT(req: Request) {
    console.log('Received data route.ts in saveBook:')
  try {
    const connection = await connectToDB()
    if(!connection) return;

    const body = await req.json();
    const { ISBN, Title, Author } = body;

    if (!Title || !Author || !ISBN) {
        return NextResponse.json(
            { message: 'parameter(s) is/are missing' },
            { status: 400 }
          );
      }
    
    console.log('Received data route.ts:', { ISBN, Title, Author,  });
    // Log the received data (database logic here)
    //addBook(title: string, author: string, isbn: string, description: string)
    //addBook(title, author, isbn, "test description")
      
    return NextResponse.json({ message: 'Form data saved successfully!' });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}