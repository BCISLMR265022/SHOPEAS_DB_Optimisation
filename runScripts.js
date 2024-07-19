const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecommerce',
  password: 'admin',
  port: 5000,
});

const runSqlFile = async (filePath) => {
  const sql = fs.readFileSync(filePath, 'utf8');
  try {
    await pool.query(sql);
    console.log(`Successfully executed ${path.basename(filePath)}`);
  } catch (err) {
    console.error(`Error executing ${path.basename(filePath)}:`, err);
  }
};

const runScripts = async () => {
  try {
    await runSqlFile(path.join(__dirname, 'config', 'optimized_schema.sql'));
    await runSqlFile(path.join(__dirname, 'config', 'procedures_triggers.sql'));
    await runSqlFile(path.join(__dirname, 'config', 'populate_data.sql'));
  } finally {
    await pool.end();
  }
};

runScripts();
