// import type { NextApiRequest, NextApiResponse } from 'next';
// import connectToDB from 'src/app/components/connectToDB.tsx';


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const db = await connectToDB();
//       const tags = await db.collection('tags').find({}).toArray(); // Adjust based on your database
//       res.status(200).json(tags);
//     } catch (error) {
//       console.error('Error fetching tags:', error);
//       res.status(500).json({ message: 'Error fetching tags' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// }
