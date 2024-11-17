'use client'
import type { NextApiRequest, NextApiResponse } from 'next';

// Define the handler for the API route
export default function POST(req: NextApiRequest, res: NextApiResponse) {
  console.error('req.method: ', req.method);
  if (req.method === 'POST') {
    console.log('Received request at /api/submitForm');
    console.log('Request method:', req.method);
    console.log('HERE: handler');
    const { isbn, title, author, tags } = req.body;

    // Validate received data (optional)
    if (!isbn || !title || !author || !tags) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Log the received data (replace with database logic if needed)
    console.log('Received data submitForm.ts:', { isbn, title, author, tags });
    

    // Respond with a success message
    return res.status(200).json({ message: 'Form data saved successfully!' });
  } else {
    // Handle unsupported HTTP methods
    res.setHeader('Allow', ['POST']);
    console.log(`Unsupported method: ${req.method}`);
    return res.status(405).json({ message: `Method ${req.method} not allowed Unsupported method: ${req.method}` });
  }
}

// import type { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     res.status(200).json({ message: 'Form submitted successfully!' });
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// }


