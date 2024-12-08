import { NextResponse } from 'next/server';

import connectToDB from "../../../components/connectToDB"
import {addBook2,dropBook} from "../../../components/book_entry";
type PayloadWithInitialTags = {
  editDetails: any;
  initialTags: string[];
  initialTitle: string;
};

type PayloadWithUpdatedTags = {
  editDetails: any;
  updatedTags: string[];
  initialTitle: string;
};

type Payload = PayloadWithInitialTags | PayloadWithUpdatedTags;

export async function POST(req: Request) {
    console.log('Received data route.ts in saveBook:')
  try {
    const connection = await connectToDB()
    if(!connection) return;

    const body = await req.json();
    const { editDetails } = body as Payload;
    const { ISBN, Title, Author, Description, description, Language } = editDetails;
    let initialTags: string[] | undefined;
    let updatedTags: string[] | undefined;
    let initialTitle: string;

    if ('initialTags' in body) {
        initialTags = body.initialTags;
    } else if ('updatedTags' in body) {
        updatedTags = body.updatedTags;
    }
    initialTitle = body.initialTitle;

    console.log('Received initialTitle route.ts in saveBook:', { initialTitle });

    console.log('Received editDetails route.ts in saveBook:', { editDetails });
    console.log('Received editDetails.data route.ts in saveBook:', { ISBN, Title, Author, Description, description, Language });

  await dropBook(initialTitle);
  console.log('Dropped book:', initialTitle);
  console.log('drpped book:', initialTitle);
  if (updatedTags && updatedTags.length > 0) {
    console.log('Received updatedTags route.ts in saveBook::', { updatedTags });
    
    addBook2(Title, Author, ISBN, Description, Language, updatedTags);
  } else {
    console.log('Received initialTags route.ts in saveBook::', { initialTags });
    if (initialTags) {
      
      addBook2(Title, Author, ISBN, Description, Language, initialTags);
    }
  }
  
      
    return NextResponse.json({ message: 'Form data saved successfully!' });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}