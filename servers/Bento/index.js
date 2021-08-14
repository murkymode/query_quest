const express = require('express');
const pool = require('../../database');
// const reviewsRouter = require('./routes');
// const router = express.Router();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/../client/dist'));

app.get('/reviews', async (request, response) => {
  const client = await pool.connect();
  const results = await client.query('SELECT * FROM reviews LIMIT 10');
  client.release();
  response.send(results.rows);
});

// app.get('/reviews/meta', async (request, response) => {
//   const client = await pool.connect();
//   const results = await client.query('SELECT * FROM reviewsMeta LIMIT 10');
//   client.release();
//   response.send(results.rows);
// });

// POST to /reviews

// PUT to /reviews/:review_id/helpful

// PUT to /reviews/:review_id/report

app.listen(port, () => {
  console.log(`Server says hello from port ${port}`);
});
