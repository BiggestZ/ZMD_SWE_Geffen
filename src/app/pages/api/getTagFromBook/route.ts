import connectToDB from "../../../components/connectToDB"
import { NextResponse } from 'next/server';
import { getSubtopicsForBook } from '../../../components/book_entry';

  export async function GET(req: Request) {
    try {
      const { searchParams } = new URL(req.url);
      const title = searchParams.get("title");
  
      if (!title) {
        return NextResponse.json(
          { message: 'Query parameter is missing' },
          { status: 420 }
        );
      }
  
      // Connect to the database
      const connection = await connectToDB();
      if (!connection) {
        return NextResponse.json(
          { message: 'Failed to connect to the database' },
          { status: 500 }
        );
      }
  
      // Search for books in the database
      const books = await getSubtopicsForBook(title); 
  
      if (!books) {
        return NextResponse.json(
          { message: 'No books found', books: [] },
          { status: 404 }
        );
      }
  
      // Return the found books
      return NextResponse.json({ message: 'Books retrieved successfully', books });
    } catch (error) {
      console.error('Error in searchBooks API:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  