/* eslint-disable no-console */
import fs from 'fs';

const Pool = require('pg').Pool;

const dbconfigPath = '/srv/bos.se/dbconfig.json';

let config;
if (fs.existsSync(dbconfigPath)) {
  config = JSON.parse(fs.readFileSync(dbconfigPath, 'utf8'));
} else {
  console.log('dbconfig not found, falling back to dev settings');
  config = {
    host: 'localhost',
    user: 'postgres',
    password: 'abc123',
    database: 'ploxnotes',
  };
}

console.log('creating pool');
export const db = new Pool(config);

db.query('SELECT 1337')
  .then(() => console.log('database connection works!'))
  .catch((err) => {
    console.log('DB CONNECTION FAILED!');
    throw err;
  });

// inspired by https://github.com/felixfbecker/node-sql-template-strings
export const SQL = (parts, ...values) =>
  ({
    text: parts.reduce((prev, curr, i) => prev + '$' + i + curr), // eslint-disable-line prefer-template
    values,
  });

