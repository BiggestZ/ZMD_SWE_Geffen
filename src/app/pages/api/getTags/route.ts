export const API_ROUTES = {

    GET_TAGS: 'pages/api/getTags/',


  };

  import connectToDB from "../../../components/connectToDB"
  import { NextResponse } from 'next/server';
  import { getAllTopics } from '../../../components/book_entry';

  export async function GET(req: Request) {
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
      const topics = await getAllTopics(); 
      console.log('topics:', topics);
  
      if (!topics) {
        return NextResponse.json(
          { message: 'No topics found' },
          { status: 404 }
        );
      }
  
      // Return the found books
      return NextResponse.json({ message: 'topics retrieved successfully', topics });
    } catch (error) {
      console.error('Error in getAllTopics API:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
  