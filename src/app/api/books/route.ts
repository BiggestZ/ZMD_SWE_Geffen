import { NextResponse } from 'next/server';
import connectToDB from '@/app/components/connectToDB';
import { getBooksList,getAllBooks,getAllSubtopics } from '@/app/components/book_entry';
import { Book } from '@/types';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const subtopic = searchParams.get("subtopic");

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

    const booksList = await getAllBooks();
    const subtopicsList = await getAllSubtopics();

    const filtestered = booksList['art']    
    const test2  = booksList['language']

    let filtered = booksList[formatSubtopic]
    console.log("lang", filtered)
    console.log('art', filtestered)
    console.log('test', test2)

    // Return the found books
    return NextResponse.json({ message: 'Books retrieved successfully', filtered,subtopicsList});
  } catch (error) {
    console.error('Error in searchBooks API:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
