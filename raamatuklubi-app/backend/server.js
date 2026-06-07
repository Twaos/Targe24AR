const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.userId = 1;
  next();
});

app.get('/api/books', controllers.getAllBooks);
app.post('/api/books', controllers.addBook);
app.delete('/api/books/:id', controllers.deleteBook);
app.get('/api/books/:id', controllers.getBookDetails);
app.post('/api/books/:id/reviews', controllers.addReview);
app.get('/api/books/:id/reviews', controllers.getReviews);
app.get('/api/events', controllers.getAllEvents);
app.post('/api/events', controllers.addEvent);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});