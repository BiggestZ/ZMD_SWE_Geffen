export const API_ROUTES = {

    GET_TAGS: 'pages/api/getTags/',
    GET_SUBTAGS: 'pages/api/getSubTags/',


  };

  import connectToDB from "../../../components/connectToDB"
  import { NextResponse } from 'next/server';
  import { getAllTopics } from '../../../components/book_entry';
  import  handleTagChange from "../../../components/tagEditor";

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

      // Request for all topics in the database
      try {
        const topics = await getAllTopics(); // Await the promise
        console.log('topics route.ts:', topics);
      
        if (!topics || topics.length === 0) {
          return NextResponse.json(
            { message: 'No topics found' },
            { status: 404 }
          );
        }
      
        return NextResponse.json(
          { topics },
          { status: 200 }
        );
      } catch (error) {
        console.error('Error fetching topics:', error);
        return NextResponse.json(
          { message: 'Error fetching topics' },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error('Error in getAllTopics API:', error);
      return NextResponse.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
