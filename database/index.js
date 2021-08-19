// create a pool connection, with a maximum of 20 clients.

const { Pool } = require('pg');

// const port = 3000;

const pool = new Pool({
  user: 'murkymode',
  host: 'localhost',
  database: 'sdc',
  password: '',
  max: 20,
  // port,
});

module.exports = pool;
