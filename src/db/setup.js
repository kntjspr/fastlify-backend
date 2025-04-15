'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

// Create a new PostgreSQL connection pool using environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Read SQL file
const setupSQL = fs.readFileSync(path.join(__dirname, 'init.sql'), 'utf8');

// Execute SQL script
async function setupDatabase() {
  try {
    const client = await pool.connect();
    try {
      await client.query(setupSQL);
      console.log('Database initialized successfully');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
}

// Run the setup
setupDatabase(); 