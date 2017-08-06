/* eslint-disable no-console */
import fs from 'fs';
import pg from 'pg';

const Pool = pg.Pool;

const configPath = '/apps/bos.se/config.json';
const configDevPath = 'config.dev.json';

let config;
if (fs.existsSync(configPath)) {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
} else {
  console.log('config not found, falling back to dev settings');
  if (fs.existsSync(configDevPath)) {
    config = JSON.parse(fs.readFileSync(configDevPath, 'utf8'));
  } else {
    console.log('dev settings not found, exiting');
    throw new Error('dev settings not found, exiting');
  }
}

console.log('creating pool');
export const db = new Pool(config);

db
  .query('SELECT 1337')
  .then(() => console.log('database connection works!'))
  .catch((err) => {
    console.log('DB CONNECTION FAILED!');
    throw err;
  });

// inspired by https://github.com/felixfbecker/node-sql-template-strings
export const SQL = (parts, ...values) => ({
  text: parts.reduce((prev, curr, i) => prev + '$' + i + curr), // eslint-disable-line prefer-template
  values,
});
