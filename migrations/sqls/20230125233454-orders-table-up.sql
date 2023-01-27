CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    isactive BOOLEAN NOT NULL,
    user_id INTEGER REFERENCES users(id)
);