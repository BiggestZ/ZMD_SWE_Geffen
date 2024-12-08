

  import connectToDB from "../../../components/connectToDB"
  import { NextRequest, NextResponse } from 'next/server';
  import { getSubtopicsByTopic } from '../../../components/book_entry';

  export async function GET(req: NextRequest, res: NextResponse) {
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
      const { searchParams } = new URL(req.url);
      const topic = searchParams.get("topic");
      console.log('title in getSubtag route.ts:', topic);

      
  
      // request for all topics in the database
      //const topics = await getAllTopics(); 
      //FIXME
       //const subTags = ["subtag1","subtag2","subtag3", "multiple meanings", "fear", "self-identity"];
      const subTags = getSubtopicsByTopic(topic);
      console.log('topic, subtopics:',topic, subTags);
  
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
  