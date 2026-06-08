const { BookService, EventService } = require('./services');

const controllers = {
  getAllBooks: (req, res) => {
    BookService.getAllBooks((err, books) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(books);
    });
  },
  
  addBook: (req, res) => {
    const userId = req.userId;
    BookService.addBook(req.body, userId, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Raamat lisatud" });
    });
  },
  
  deleteBook: (req, res) => {
    const userId = req.userId;
    BookService.deleteBook(req.params.id, userId, (err) => {
      if (err) return res.status(403).json({ error: err.message });
      res.json({ message: "Raamat kustutatud" });
    });
  },
  
  getBookDetails: (req, res) => {
    BookService.getBookWithAvgRating(req.params.id, (err, book) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(book);
    });
  },
  
  addReview: (req, res) => {
    const userId = req.userId;
    const { rating, comment } = req.body;
    BookService.addReview(req.params.id, userId, rating, comment, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Arvustus lisatud" });
    });
  },
  
  getReviews: (req, res) => {
    BookService.getReviews(req.params.id, (err, reviews) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(reviews);
    });
  },
  
  getAllEvents: (req, res) => {
    EventService.getAllEvents((err, events) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(events);
    });
  },
  
  addEvent: (req, res) => {
    const userId = req.userId;
    EventService.addEvent(req.body, userId, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Üritus lisatud" });
    });
  }
};

module.exports = controllers;