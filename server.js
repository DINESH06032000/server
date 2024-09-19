// Load environment variables from .env file
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware for parsing JSON request bodies

// Database connection pool for better performance
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10 // To handle multiple connections efficiently
});

// Test the database connection
db.getConnection((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// Endpoint to insert data
app.post('/cont', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !phone || !message) {
    return res.status(400).send('All fields are required.');
  }

  const query = `INSERT INTO data (firstName, lastName, email, phone, message) VALUES (?, ?, ?, ?, ?)`;
  
  db.query(query, [firstName, lastName, email, phone, message], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err.stack);
      return res.status(500).send('Error inserting data.');
    }
    res.status(200).send('Data inserted successfully!');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
