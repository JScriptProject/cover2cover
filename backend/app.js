import fs from 'node:fs/promises';
import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();

// Serve static files (e.g., images)
app.use(express.static('images'));
app.use(express.json()); // Parse JSON bodies

const allowedOrigin = process.env.NODE_ENV === 'production'
  ? 'https://cover2cover-seven.vercel.app'
  : '*';

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

const BOOKS_FILE = './data/books.json';

// GET all books
app.get('/books', async (req, res) => {
  try {
    const fileContent = await fs.readFile(BOOKS_FILE);
    const books = JSON.parse(fileContent);
    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ message: 'Failed to read books', error: err.message });
  }
});

// ADD a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, status, rating, cover } = req.body;
    const fileContent = await fs.readFile(BOOKS_FILE);
    const books = JSON.parse(fileContent);
    const newBook = {
      id: uuid(),
      title,
      author,
      status,
      rating,
      cover,
    };
    books.push(newBook);
    await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
    res.status(201).json({ message: 'Book added!', book: newBook });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add book', error: err.message });
  }
});

// UPDATE a book by ID
app.put('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const updatedData = req.body;
    const fileContent = await fs.readFile(BOOKS_FILE);
    const books = JSON.parse(fileContent);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    books[bookIndex] = { ...books[bookIndex], ...updatedData };
    await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
    res.status(200).json({ message: 'Book updated', book: books[bookIndex] });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update book', error: err.message });
  }
});

// DELETE a book by ID
app.delete('/books/:id', async (req, res) => {
  try {
    const bookId = req.params.id;
    const fileContent = await fs.readFile(BOOKS_FILE);
    let books = JSON.parse(fileContent);
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    books = books.filter(book => book.id !== bookId);
    await fs.writeFile(BOOKS_FILE, JSON.stringify(books, null, 2));
    res.status(200).json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete book', error: err.message });
  }
});

// 404 handler
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
