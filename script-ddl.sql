-- Creating the Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Creating the Books table
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0,
    ratingCount INT DEFAULT 0
);

-- Creating the Borrows table
CREATE TABLE borrows (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    book_id INT REFERENCES books(id) ON DELETE CASCADE,
    borrowDate TIMESTAMP NOT NULL,
    returnDate TIMESTAMP NULL,
    rating FLOAT DEFAULT 0
);

-- Inserting sample users
INSERT INTO users (name)
VALUES ('Esin Öner'), ('Ali Can Güneş');

-- Inserting sample books
INSERT INTO books (name, rating, ratingCount)
VALUES 
('Lord of the Rings', 4.8, 300),
('Harry Potter', 4.9, 500),
('I, Robot', 4.5, 150);

-- Inserting sample borrow records
INSERT INTO borrows (user_id, book_id, borrowDate, returnDate, rating)
VALUES 
(1, 1, '2024-08-01', '2024-08-08', 4.8),
(2, 2, '2024-08-03', '2024-08-10', 4.9),
(1, 3, '2024-08-05', NULL, 0);