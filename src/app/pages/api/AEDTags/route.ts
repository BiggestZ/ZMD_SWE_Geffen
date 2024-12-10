export const API_ROUTES = {

    ADD_TAG: 'pages/api/AEDTags/',
    EDIT_TAG: 'pages/api/editTags/',
    DELETE_TAG: 'pages/api/deleteTags/',
    
  };


import connectToDB from "../../../components/connectToDB"
import { addSubtopic, checkTopicSubtopic } from '../../../components/subtopics';
import { NextResponse } from 'next/server';
import { addTopic} from '../../../components/topics';


export async function POST(req: Request) {
    console.log('Received data route.ts in AEDTags1:');
    try {
      const connection = await connectToDB()
      if(!connection) {
        console.log('DB Error');
        return NextResponse.json({ error: 'Failed to connect to database' });
      }

      const body = await req.json();
      const { tag, topic } = body.data;

      console.log('Data at route.ts in AEDTags1:', { tag, topic });
      if (!tag || typeof tag !== 'string' || !topic || typeof topic !== 'string') {
        return NextResponse.json({ error: 'Invalid tag or topic. Both are required.' },{status: 400});
      }

      console.log('tag:', {tag});
      
      console.log('Received data route.ts AEDTags2:', { tag });
      // Log the received data (database logic here)

      const topicSubtopicIds = await checkTopicSubtopic(topic, tag, connection);
      console.log('topicSubtopicIds', { topicSubtopicIds});


      if ((topicSubtopicIds.topicId == null) && (topicSubtopicIds.subtopicId == null)) 
      {
        //server error
        return NextResponse.json({ error: 'Error, Try Again' },{status: 510});
      }
      else if (topic == tag) 
        {
          addTopic(topic)
          addSubtopic(topic,tag)
          return NextResponse.json({ message: 'Topic added to the database' },{status: 520});
          
        }
      else if (topicSubtopicIds.topicId == null && topicSubtopicIds.subtopicId != null) 
      {
        //addSubtopic(topic, tag)
        return NextResponse.json({ error: 'Topic doesnt exist in the database' },{status: 520});
        //addSubtopic(topic, tag)
        //topicId, subtopicId
      }
      else if (topicSubtopicIds.topicId != null && topicSubtopicIds.subtopicId != null){
      
        return NextResponse.json({ error: 'Already in the DataBase' },{status: 400});
      }
        else if (topicSubtopicIds.topicId != null && topicSubtopicIds.subtopicId == null) 
        {
            addSubtopic(topic, tag)
        }
      return NextResponse.json({ message: 'Form data saved successfully!' });
      
    } 
    catch (error) {
        console.error('Error saving form data:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
