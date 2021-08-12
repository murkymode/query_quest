-- DROP DATABASE IF EXISTS sdc;
-- CREATE DATABASE sdc;
-- \c sdc;

create table reviews (
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  rating INT NOT NULL,
  date BIGINT,
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness INT NOT NULL
);

create table reviews_photos (
  id INT PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR,
  FOREIGN KEY (review_id)
    REFERENCES reviews (id)
);

create table characteristics (
  id INT PRIMARY KEY,
  product_id INT NOT NULL,
  name VARCHAR
);

create table characteristic_reviews (
  id INT PRIMARY KEY,
  chracteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value VARCHAR,
  FOREIGN KEY (chracteristic_id)
    REFERENCES characteristics (id),
  FOREIGN KEY (review_id)
    REFERENCES reviews (id)
);

copy reviews from '/Users/murkymode/Downloads/reviews.csv' DELIMITER ',' CSV HEADER;
copy reviews_photos from '/Users/murkymode/Downloads/reviews_photos.csv' DELIMITER ',' CSV HEADER;
copy characteristics from '/Users/murkymode/Downloads/characteristics.csv' DELIMITER ',' CSV HEADER;
copy characteristic_reviews from '/Users/murkymode/Downloads/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;
