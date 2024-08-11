
# Library Management Application

This is a RESTful API for managing a library, including users, books, and the borrowing and returning of books. The application is built using Node.js, Express.js, TypeScript, PostgreSQL, TypeORM, and Joi with Winston for logging.


## Features
### User Management

- List all users.
- View user details, including name, books borrowed in the past with their ratings, and currently borrowed books.
- Create a new user.
### Book Management
- List all books.
- View book details, including name and average rating.
- Create a new book.
- Borrowing & Returning Books:

### Borrow Management
- Return a book and provide a rating.

## Technologies Used
- Node.js: JavaScript runtime for building the API.
- Express.js: Web framework for Node.js to create RESTful routes.
- TypeScript: Strongly typed programming language that builds on JavaScript.
- PostgreSQL: Relational database management system for storing data.
- TypeORM: ORM for managing database operations with PostgreSQL.
- Winston: Logging library for tracking application logs.
- Joi: A powerful schema validation library for JavaScript applications.

## Installation
- Clone the repository
```
git clone https://github.com/cangnss/library-api
```
- Navigate to the project directory
```
cd library-api
```
- Install dependencies
```
npm install
```
- Create .env file
```
PORT=<YOUR PORT>
POSTGRES_HOST=<YOUR HOST NAME>
POSTGRES_PORT=<YOUR POSTGRES PORT>
POSTGRES_DB_NAME=<YOUR DATABASE NAME>
POSTGRES_USERNAME=<YOUR POSTGRES USERNAME>
POSTGRES_PASSWORD=<YOUR POSTGRES PASSWORD>
```
- Set up the database
Make sure PostgreSQL is installed and running on your system. Run the DDL script provided in the script-ddl.sql file to set up the tables.
Configure your database connection settings in the .env file.
- Run the application
```
npm run start
```

## API Endpoints
The following endpoints are available in the application:
### User Endpoints
- GET /users: List all users.
- GET /users/2: Getting a user with no borrow history or a user with their past and current book borrow list.
- POST /users: Create a new user.

### Book Endpoints
- GET /books: List all books.
- GET /books/2: Getting a book with its average user score or a book which is not scored yet
- POST /books: Create a new book.

### Borrowing & Returning
- POST /borrow: Borrow a book. Requires userId and bookId in the params.
- POST /return: Return a book and provide a rating. Requires userId, bookId, and rating in the params.

## Error Handling
The application includes robust error handling for cases such as:
- Attempting to borrow a book by a non-existing user.
- Trying to borrow a book that has already been borrowed by another user.
- Returning a book that wasn't borrowed.

## Logging
Winston is used for logging important application events and errors. Logs are stored in the logs directory.

## Validation
Request bodies are validated using Joi to ensure that data is correctly formatted and complete.

## Database Schema
The database schema is defined in the script-ddl file. It includes tables for users, books, and borrows.
