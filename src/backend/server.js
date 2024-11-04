import express from 'express';
import { createPool } from 'mysql2';

const app = express();
const PORT = 8081;

// Create a MySQL connection pool
const db = createPool({
  host: 'localhost',        // Your MySQL host
  user: 'root',   // Your MySQL username
  password: '',  // Your MySQL password
  database: 'geffen_db',   // Your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test route to check database connection
app.get('/test-connection', (req, res) => {
  db.query('SELECT * from Books', (err, results) => {
    if (err) {
      console.error('Database connection error:', err);
      return res.status(500).json({ error: 'Database connection failed' });
    }
    res.json({ message: 'Database connected successfully!', result: results[0].solution });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
