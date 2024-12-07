import { NextResponse } from 'next/server';
import connectToDB from '@/app/components/connectToDB';
import { getBooksList,getAllBooks,getAllSubtopics } from '@/app/components/book_entry';
import { Book } from '@/types';

export const API_ROUTES = {

    SEARCH: 'pages/api/search/',
    
  };

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    let subtopic = searchParams.get("subtopic");

    if(!subtopic) {
        return NextResponse.json(
            { message: 'Query parameter is missing' },
            { status: 400 }
          );
    }

    let formatSubtopic = subtopic.toLowerCase()

    // Connect to the database
    const connection = await connectToDB();
    if (!connection) {
      return NextResponse.json(
        { message: 'books database connection failed' },
        { status: 500 }
      );
    }

    let allBooks = await getBooksList();
    const booksList = await getAllBooks();
    const subtopicsList = await getAllSubtopics();

    function matchBooks(booksArray : Array<Book>, filter?: string) : Array<Book> {
        
      let finalList : Array<Book> = []

      if (filter) {
          let test = booksList[filter]
          for (const name of test) {
              for (const book of booksArray) {
                  if (book.title == name) {
                      book.tagsList = subtopicsList[book.title]
                      finalList.push(book)
                  }
              }
          }
          return finalList;
      }
      else {
          return booksArray;
      }
  }
  
  let filtered = matchBooks(allBooks,formatSubtopic)

  //let filtered = booksList[formatSubtopic]

    // Return the found books
    return NextResponse.json({ filtered });
  } catch (error) {
    console.error('Error in searchBooks API:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}