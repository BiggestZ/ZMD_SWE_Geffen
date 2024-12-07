import { NextResponse } from 'next/server';

import connectToDB from "../../../components/connectToDB"


export async function PUT(req: Request) {
    console.log('Received data route.ts in updateTags:')
  try {
    const connection = await connectToDB()
    if(!connection) return;


    //getSubtopicsForBook
    try {
      const subtopics = await getsubtopicsForBook(); // Await the promise
      console.log('subtopics route.ts:', subtopics);
    
      if (!subtopics || subtopics.length === 0) {
        return NextResponse.json(
          { message: 'No topics found' },
          { status: 404 }
        );
      }
    
      return NextResponse.json(
        { subtopics },
        { status: 200 }
      );
    }
    catch (error) {
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