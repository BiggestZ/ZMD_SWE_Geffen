
export const API_ROUTES = {

    DELETE_BOOK: 'pages/api/deleteBook/',
    
  };

import { NextResponse } from 'next/server';
import connectToDB from "../../../components/connectToDB"
import { dropBook } from '../../../components/book_entry';

export async function POST(req: Request) {
    console.log('Received data route.ts in deleteBook:');
    try {
      const connection = await connectToDB()
      if(!connection) return;
      const body = await req.json();
      const { data } = body;
      const { title } = data;
      console.log('title:', {title});
      if (!title) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
      }
      console.log('Received data route.ts:', { title });
      // Log the received data (database logic here)
      dropBook(title)
        
      return NextResponse.json({ message: 'Form data saved successfully!' });
      
    } catch (error) {
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }