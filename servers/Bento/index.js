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
  const query = {
    text: 'SELECT * FROM reviews WHERE product_id = $1',
    values: [product_id],
  };
console.log(product_id, page, count);
  const client = await pool.connect();
  const results = await client.query(query);
  client.release();
  res.send(results.rows);
});







app.get('/reviews/meta/:id', async (req, res) => {
  const { id } = req.params;
  const metaReturn = {};
  metaReturn.product_id = id;
  metaReturn.ratings = {};
  metaReturn.recommend = {};
  metaReturn.characteristics = {};

  const client = await pool.connect();
  const results = await client.query(
    `SELECT json_build_object ('product_id', ${id}, 'ratings', json_build_object (ratings_meta.rating, ratings_meta.count)) AS result FROM ratings_meta WHERE product_id = ${id};`,
    // SELECT JSONB_OBJECT_AGG(countRating.rating, countRating.value) AS ratings,
    // JSONB_OBJECT_AGG(countRecommend.recommend, countRecommend.value) AS recommendations,
    // JSONB_OBJECT_AGG(metaData.name, JSON_BUILD_OBJECT('id', metaData.id, 'value', metaData.value)) AS characteristics FROM
  ).then();
  client.release();
  res.send(results.rows);
});

// POST to /reviews
// app.post('/reviews/:id', async (req, res) => {
//   const { id } = req.params;
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
