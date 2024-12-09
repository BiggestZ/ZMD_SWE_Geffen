import { NextResponse } from 'next/server';
import connectToDB from '../../../components/connectToDB';
import { getBooksList, getBookByTitle,getAllSubtopics } from '../../../components/book_entry';
import { Book } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    if (!title) {
      return NextResponse.json(
        { message: 'Query parameter is missing' },
        { status: 400 }
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
    const search = await getBookByTitle(title); 
   // const allBooks = await getBooksList();
    const subtopics = await getAllSubtopics();
    
    let books : Book[] = [];
    
    if (!search) {
      return NextResponse.json(
        { message: 'No books found', books: [] },
        { status: 404 }
      );
    }
    else {
        search.forEach((book : any) => {
          
          let newBook : Book = {
            title: book.Title,
            author: book.Author,
            isbn: book.ISBN,
            bookDesc: book.Description,
            tagsList: subtopics[book.Title]
          }

          books.push(newBook)
        }
        )
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
