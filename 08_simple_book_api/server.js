const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());

const dataFile = path.join(__dirname, 'books.json');

function loadBooks() {
    const data = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(data);
}

function saveBooks(books) {
    fs.writeFileSync(dataFile, JSON.stringify(books, null, 2));
}

// let books = [
//     {id: 1, title: '1984', author: 'George Orwell'},
//     {id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee'}
// ];

// let nextId = 3;

// GET
app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js and Express');
});

// GET /api/books
app.get('/api/books', (req, res) => {
    const books = loadBooks();
    res.json(books);
});

// GET /api/books/:id
app.get('/api/books/:id', (req, res) => {
    const books = loadBooks();
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({message: 'Book not found'});
    res.json(book);
});

// POST /api/books
app.post('/api/books', (req, res) => {
    const {title, author} = req.body;
    if (!title || !author) {
        return res.status(400).json({message: 'Title and author are required'});
    }

    const books = loadBooks();
    const newBook = { id: nextId++, title, author };
    books.push(newBook);
    saveBooks(books);
    res.status(201).json(newBook);
});

// PATCH /api/books/:id
app.patch('/api/books/:id', (req, res) => {
    const books = loadBooks();
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const { title, author } = req.body;
    if (title) book.title = title;
    if (author) book.author = author;

    saveBooks(books);
    res.json(book);
});

// DELETE /api/books/:id
app.delete('/api/books/:id', (req, res) => {
    let books = loadBooks();
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);
    if (index === -1) return res.status(404).json({ message: 'Book not found' });

    books.splice(index, 1);
    saveBooks(books);
    res.json({ message: 'Book deleted successfully '});
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})