import { NextResponse } from 'next/server';

import connectToDB from "../../../components/connectToDB"
import {addBook2,dropBook} from "../../../components/book_entry";
import { collectMeta } from 'next/dist/build/utils';
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
    const { ISBN, Title, Author, Description, isbn, Language } = editDetails;
    let initialTags: string[] | undefined;
    let updatedTags: string[] | undefined;
   

    if ('initialTags' in body) {
        initialTags = body.initialTags;
    } else if ('updatedTags' in body) {
        updatedTags = body.updatedTags;
    }
    

    // console.log('Received isbn route.ts in saveBook:', { ISBN });

  console.log('Received editDetails route.ts in saveBook:', { editDetails });
    
  await dropBook(isbn);
  console.log('Dropped book: ISBN', isbn);
  
  const isbnToUse = ISBN || isbn;
  console.log('isbnToUse:', isbnToUse);
  if (updatedTags && updatedTags.length > 0) {
    
    // console.log('Received updatedTags route.ts in saveBook::', updatedTags );
    // console.log('typeof updatedTags in route.ts in saveBook::', typeof updatedTags );
    
    addBook2(Title, Author, isbnToUse, Description, Language, updatedTags);
    console.log('Added book in route.ts in saveBook (updatedTags):', Title, Author, isbnToUse, Description, Language, updatedTags);
  } else {
    // console.log('Received initialTags route.ts in saveBook::', { initialTags });
    if (initialTags) {
      
      addBook2(Title, Author, isbnToUse, Description, Language, initialTags);
      console.log('Added book in route.ts in saveBook (initialTags):', Title, Author, isbnToUse, Description, Language, updatedTags);
    }
  }
  
      
    return NextResponse.json({ message: 'Form data saved successfully!' });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}