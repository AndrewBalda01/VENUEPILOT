require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setup() {
  // Connect without database selected
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    multipleStatements: true,
  });

  console.log('Connected to MySQL. Creating database...');
  await conn.query('CREATE DATABASE IF NOT EXISTS venuepilot CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
  await conn.query('USE venuepilot');

  // Read SQL file
  const sql = fs.readFileSync(path.join(__dirname, 'database', 'setup.sql'), 'utf8');

  // Execute (skip CREATE DATABASE and USE since we already did them)
  const lines = sql
    .split('\n')
    .filter(l => !l.trim().startsWith('CREATE DATABASE') && l.trim() !== 'USE venuepilot;')
    .join('\n');

  await conn.query(lines);
  console.log('Database created and seeded successfully!');
  await conn.end();
}

setup().catch(err => {
  console.error('Setup failed:', err.message);
  process.exit(1);
});
