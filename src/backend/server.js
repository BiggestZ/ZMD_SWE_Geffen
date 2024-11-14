import express from 'express';
import { createPool } from 'mysql2';

const app = express();
const PORT = 8081;

// Create a MySQL connection pool
const db = createPool({
  host: 'sql.cianci.io',       // Your MySQL host
  user: 'acheng2',  // Your MySQL username
  password: 'cl6g*t5URndDuZxe', // Your MySQL password
  database: '2024fall_comp367_geffen',  // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default db;



// Test route to check database connection
app.get('/test-connection',(req,res) => {
  db.query('SELECT * from Books',(err,results) => {
    if (err) {
      console.error('Database connection error:',err);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    res.json({ message: 'Database connected successfully!',result: results[0].solution });
  });
});

// Start the server
app.listen(PORT,() => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
