-- Creating the Users table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Creating the Books table
CREATE TABLE Books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rating FLOAT DEFAULT 0,
    ratingCount INT DEFAULT 0
);

-- Creating the Borrows table
CREATE TABLE Borrows (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES Users(id) ON DELETE CASCADE,
    bookId INT REFERENCES Books(id) ON DELETE CASCADE,
    borrowDate TIMESTAMP NOT NULL,
    returnDate TIMESTAMP NULL,
    rating FLOAT DEFAULT 0
);

-- Sample data insertion

-- Inserting sample users
INSERT INTO Users (name)
VALUES ('Esin Öner'), ('Ali Can Güneş');

-- Inserting sample books
INSERT INTO Books (name, rating, ratingCount)
VALUES 
('Lord of the Rings', 4.5, 150),
('1984', 4.6, 250);

-- Inserting sample borrow records
INSERT INTO Borrows (userId, bookId, borrowDate, returnDate, rating)
VALUES 
(1, 1, '2024-08-01', '2024-08-08', 4.5),
(2, 2, '2024-08-03', NULL, 0);