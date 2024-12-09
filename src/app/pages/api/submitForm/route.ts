
export const API_ROUTES = {

    SUBMIT_FORM: 'pages/api/submitForm/',
    
    
  };

import { NextResponse } from 'next/server';
import { addBook2 } from '../../../components/book_entry';
import connectToDB from "../../../components/connectToDB"


export async function POST(req: Request) {
  try {
    const connection = await connectToDB()
    if(!connection) return;
    const body = await req.json();
    const { isbn, title, author, tags, description, language } = body;
    if (!isbn || !title || !author || !tags) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    console.log('Received data route.ts:', { isbn, title, author, tags ,description, language});
    console.log('Received data route.ts tags:',  tags );
    console.log('typeof tags:',  typeof tags );
    // Log the received data (database logic here)
    //addBook(title: string, author: string, isbn: string, description: string)
    addBook2(title, author, isbn, description, language, tags)
      
    return NextResponse.json({ message: 'Form data saved successfully!' });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

