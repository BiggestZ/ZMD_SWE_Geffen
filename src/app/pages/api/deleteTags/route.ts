// import connectToDB from "../../../components/connectToDB"
// import {deleteSubtopic } from '../../../components/subtopics';
// import { NextResponse } from 'next/server';


// export async function POST(req: Request) {
//     console.log('Received data route.ts in deleteTags:');
//     try {
//       const connection = await connectToDB()
//       if(!connection) {
//         console.log('DB Error');
//         return NextResponse.json({ error: 'Failed to connect to database' });
//       }

//       const body = await req.json();
//       const { tag, topic } = body.data;

//     //   console.log('Data at route.ts in deleteTag1:', { tag, topic });
//     if (!tag || typeof tag !== 'string' || !topic || typeof topic !== 'string') {
//         return NextResponse.json({ error: 'Invalid tag or topic. Both are required.' },{status: 400});
//       }

//       console.log('tag:', {tag});
      
//       console.log('Received data route.ts deleteTags2:', { tag });
//       // Log the received data (database logic here)
//     //   deleteSubtopic(topicName: string, subtopicName: string)

//      const deleteResult = deleteSubtopic(topic, tag)
    
//      if (deleteResult == null)
//         {
//             return NextResponse.json({ error: 'Error while deleting book, try again' },{status: 400});
//         }
//      else 
//         {
//             return NextResponse.json({ message: 'Form data saved successfully!' });
//         }

      
      
//     } 
//     catch (error) {
//         console.error('Error deleting tag:', error);
//       return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
//   }
import connectToDB from "../../../components/connectToDB";
import { deleteSubtopic } from '../../../components/subtopics';
import { NextResponse } from 'next/server';

// Handle POST requests
export async function POST(req: Request) {
  console.log('Received data route.ts in deleteTags:');

  try {
    // Connect to the database
    const connection = await connectToDB();
    if (!connection) {
      console.error('DB Error');
      return NextResponse.json({ error: 'Failed to connect to database' });
    }

    // Parse request body
    const body = await req.json();
    const { tag, topic } = body.data;

    // Validate input
    // if (!tag || typeof tag !== 'string' || !topic || typeof topic !== 'string') {
    //   return NextResponse.json({ error: 'Invalid tag or topic. Both are required.' }, { status: 422 });
    // }
    console.log('Received data:', { tag, topic });
    if (!tag || typeof tag !== 'string' || !topic || typeof topic !== 'string') {
        return NextResponse.json({ error: 'Invalid tag or topic. Both are required.' }, { status: 422 });
      }

    console.log('Received data:', { tag, topic });

    // Call delete logic
    const deleteResult = deleteSubtopic(topic, tag);

    if (!deleteResult) {
      return NextResponse.json({ error: 'Error while deleting tag, try again' }, { status: 430 });
    } else {
      return NextResponse.json({ message: 'Tag deleted successfully!' });
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

