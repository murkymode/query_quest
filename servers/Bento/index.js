/* eslint-disable camelcase */
/* eslint-disable quotes */
const express = require('express');
const pool = require('../../database');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(express.static(__dirname + '/../client/dist'));

app.get('/reviews', async (req, res) => {
  const { product_id } = req.query;
  const { page } = req.query || 1;
  const { count } = req.query || 5;

  const reviewReturn = {
    product: product_id,
    page,
    count,
    results: [],
  };

  const query = {
    text: [
      `SELECT *, (SELECT json_agg(json_build_object`,
      `('id', reviews_photos.id, 'url', reviews_photos.url))`,
      `AS photos FROM reviews_photos WHERE review_id = reviews.id)`,
      `FROM reviews WHERE product_id = $1`,
    ].join(' '),
    values: [product_id],
  };

  const client = await pool.connect();
  const results = await client.query(query);
  reviewReturn.results = results.rows;
  client.release();
  res.send(reviewReturn);
});











app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query;

  const metaReturn = {
    product_id,
    ratings: {},
    recommend: {},
    characteristics: {},
  };

  const client = await pool.connect();
  const results = await client.query(
    `SELECT json_build_object ('product_id', ${product_id}, 'ratings', json_build_object (ratings_meta.rating, ratings_meta.count)) AS result FROM ratings_meta WHERE product_id = ${product_id};`,

  ).then();
  client.release();
  res.send(results.rows);
});












// POST to /reviews
// app.post('/reviews', async (req, res) => {
//   const { id } = req.query;
//   const client = await pool.connect();
//   const results = await client.query(`UPDATE reviews WHERE product_id = ${id}`);
//   client.release();
//   res.send(results.rows);
// });

// PUT to /reviews/:review_id/helpful

// PUT to /reviews/:review_id/report

app.listen(port, () => {
  console.log(`Server says hello from port ${port}`);
});
