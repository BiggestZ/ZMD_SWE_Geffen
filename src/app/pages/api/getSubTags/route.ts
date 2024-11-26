

  import connectToDB from "../../../components/connectToDB"
  import { NextResponse } from 'next/server';
  import { getAllTopics } from '../../../components/book_entry';

  export async function GET(req: Request) {
    console.log('subtopics in getSubTags API');
    try {
      // Connect to the database
      const connection = await connectToDB();
      if (!connection) {
        return NextResponse.json(
          { message: 'Failed to connect to the database' },
          { status: 500 }
        );
      }
      
  
      // request for all topics in the database
      //const topics = await getAllTopics(); 
      //FIXME
      const subTags = ["subtag1","subtag2","subtag3"];
      console.log('subtopics:', subTags);
  
      if (!subTags) {
        return NextResponse.json(
          { message: 'No subTags found' },
          { status: 404 }
        );
      }
  
      // Return the found books
      return NextResponse.json({ message: 'subtopics retrieved successfully', subtopics: subTags });

    } catch (error) {
      console.error('Error in subTags API:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  