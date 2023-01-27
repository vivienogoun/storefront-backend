CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(32) NOT NULL,
    lastname VARCHAR(32) NOT NULL,
    password_digest VARCHAR NOT NULL
);