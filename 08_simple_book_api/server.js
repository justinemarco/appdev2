const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');
const fs = require('fs');
const path = require('path');
const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 3000;
require('dotenv').config

// MIDDLEWARE
app.use(express.json()); 

const mongoURI = 'mongodb+srv://justinejynnepatricemarco:iZjnsFZYShl0sUEb@bookapi.ewnyuyx.mongodb.net/?retryWrites=true&w=majority&appName=BookAPI'

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const dataFile = path.join(__dirname, 'books.json');

function loadBooks() {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
}

function saveBooks(books) {
    fs.writeFileSync(dataFile, JSON.stringify(books, null, 2));
};

// GET
app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js and Express');
});

// GET /api/books
app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

// GET /api/books/:id
app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Invalid book ID' });
  }
});

// POST /api/books
app.post('/api/books', async (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required' });
  }

  try {
    const newBook = new Book({ title, author });
    const savedBook = await newBook.save();
    res.status(200).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Error creating book' });
  }
});

// PATCH /api/books/:id
app.patch('/api/books/:id', async (req, res) => {
  try {
    const updates = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: 'Invalid update or ID' });
  }
});

// DELETE /api/books/:id
app.delete('/api/books/:id', async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})