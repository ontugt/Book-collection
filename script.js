const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());


let books = [];


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.get('/books', (req, res) => {
    res.json(books);
});


app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;

    
    const id = Math.random().toString(36).substr(2, 9);

    
    const book = {
        id,
        title,
        author,
        publishedDate
    };

   
    books.push(book);

    
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;

    
    const bookIndex = books.findIndex(book => book.id === bookId);

    if (bookIndex !== -1) {
        
        books.splice(bookIndex, 1);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});


app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
