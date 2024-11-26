import { NextResponse } from 'next/server';

import connectToDB from "../../../components/connectToDB"


export async function PUT(req: Request) {
    console.log('Received data route.ts in updateTags:')
  try {
    const connection = await connectToDB()
    if(!connection) return;

    const body = await req.json();
    //tags: newTags
    const { tags } = body;
    console.log('Received tags:', tags);

    
    
    console.log('Received data route.ts:', { tags });
    // Log the received data (database logic here)

      
    return NextResponse.json({ message: 'Form data saved successfully!' });
    
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}