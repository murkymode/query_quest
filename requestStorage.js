/* eslint-disable max-len */

/* reviews GET */
// `SELECT *, (SELECT json_agg(json_build_object ('id', reviews_photos.id, 'url', reviews_photos.url)) AS photos FROM reviews_photos WHERE review_id = reviews.id) FROM reviews WHERE product_id = $1`

/* reviews_meta */

// SELECT JSONB_OBJECT_AGG(countRating.rating, countRating.value) AS ratings,
// JSONB_OBJECT_AGG(countRecommend.recommend, countRecommend.value) AS recommendations,
// JSONB_OBJECT_AGG(metaData.name, JSON_BUILD_OBJECT('id', metaData.id, 'value', metaData.value)) AS characteristics FROM
