const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Array to store books
let books = [];

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Route to get all books
app.get('/books', (req, res) => {
    res.json(books);
});

// Route to add a book
app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    // Generate unique ID
    const id = Math.random().toString(36).substr(2, 9);

    // Create new book object
    const book = {
        id,
        title,
        author,
        publishedDate
    };

    // Add book to the collection
    books.push(book);

    // Send response with the newly added book
    res.json(book);
});

// Route to delete a book
app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    // Find index of the book with the specified ID
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        // Remove the book from the collection
        books.splice(bookIndex, 1);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
