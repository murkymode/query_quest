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
    text:
      `SELECT *, (SELECT JSON_AGG(JSON_BUILD_OBJECT
      ('id', reviews_photos.id, 'url', reviews_photos.url))
      AS photos FROM reviews_photos WHERE review_id = reviews.id)
      FROM reviews WHERE product_id = $1`,
    values: [product_id],
  };

  const client = await pool.connect();
  const results = await client.query(query);
  reviewReturn.results = results.rows;
  client.release();
  res.send(reviewReturn);
});





// SELECT ratings_meta.product_id, json_object_agg (ratings_meta.rating, ratings_meta.count) ratings, (SELECT json_object_agg(recommend_meta.recommend, recommend_meta.count) FROM recommend_meta WHERE recommend_meta.product_id = $1 GROUP BY recommend_meta.product_id) AS recommended, (SELECT json_object_agg(characteristic_name, json_build_object('id', id, 'value' avg)) FROM characteristic_meta WHERE product_id = $1 GROUP BY product_id) AS characteristics FROM ratings_meta WHERE ratings_meta.product_id = $1 GROUP BY product_id;





// app.get('/reviews/meta', async (req, res) => {
//   const { product_id } = req.query;


//   const query = {
//     text:
//       `SELECT ratings_meta.product_id, json_object_agg (ratings_meta.rating, ratings_meta.count) ratings, (SELECT json_object_agg(recommend_meta.recommend, recommend_meta.count) FROM recommend_meta WHERE recommend_meta.product_id = $1 GROUP BY recommend_meta.product_id) AS recommended, (SELECT json_object_agg(characteristic.name, json_build_object('id', id, 'value', avg)) FROM characteristic_meta WHERE product_id = $1 GROUP BY product_id) AS characteristics FROM ratings_meta WHERE ratings_meta.product_id = $1 GROUP BY product_id`,
//     values: [product_id],
//   };

//   const client = await pool.connect();
//   const results = await client.query(query).catch();
//   client.release();
//   res.send(results.rows);
// });

// SELECT JSON_OBJECT_AGG(countRating.rating, countRating.value) AS ratings,
// JSON_OBJECT_AGG(countRecommend.recommend, countRecommend.value) AS recommendations,
// JSON_OBJECT_AGG(metaData.name, JSON_BUILD_OBJECT('id', metaData.id, 'value', metaData.value)) AS characteristics
// FROM (SELECT rating, count AS value FROM ratings_meta WHERE product_id = 1763 GROUP BY rating, count) AS countRating,
// (SELECT recommend, count AS value FROM recommend_meta WHERE product_id = 1763 GROUP BY recommend) AS countRecommend,
// (SELECT name, id, avg AS value FROM characteristic_meta WHERE product_id = 1763) AS metaData;











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
