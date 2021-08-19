/* eslint-disable max-len */

// Queries either working, or in progress

/* reviews GET: working - not fully optimized */
// `SELECT *, (SELECT json_agg(json_build_object ('id', reviews_photos.id, 'url', reviews_photos.url)) AS photos FROM reviews_photos WHERE review_id = reviews.id) FROM reviews WHERE product_id = $1`

/* reviews_meta: in progress */

// SELECT JSONB_OBJECT_AGG(countRating.rating, countRating.value) AS ratings,
// JSONB_OBJECT_AGG(countRecommend.recommend, countRecommend.value) AS recommendations,
// JSONB_OBJECT_AGG(metaData.name, JSON_BUILD_OBJECT('id', metaData.id, 'value', metaData.value)) AS characteristics FROM,
// (SELECT rating, count AS value FROM reviews_meta WHERE product_id = $1 GROUP BY rating) AS countRating

// practice query

// `SELECT *, json_build_object ('product_id', ratings_meta.product_id , 'ratings', json_build_object (ratings_meta.rating, ratings_meta.count)) AS result FROM ratings_meta WHERE product_id = $1`
