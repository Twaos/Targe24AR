const db = require('./db');

class BookService {
  static isOwner(bookId, userId, callback) {
    db.get("SELECT added_by FROM books WHERE id = ?", [bookId], (err, row) => {
      callback(err, row && row.added_by === userId);
    });
  }
  
  static getAllBooks(callback) {
    db.all("SELECT * FROM books", callback);
  }
  
  static addBook(book, userId, callback) {
    const { title, author, year, genre } = book;
    db.run("INSERT INTO books (title, author, year, genre, added_by) VALUES (?, ?, ?, ?, ?)",
      [title, author, year, genre, userId], callback);
  }
  
  static deleteBook(bookId, userId, callback) {
    this.isOwner(bookId, userId, (err, isOwner) => {
      if (err || !isOwner) return callback(new Error("Ei ole omanik"), null);
      db.run("DELETE FROM books WHERE id = ?", [bookId], callback);
    });
  }
  
  static getBookWithAvgRating(bookId, callback) {
    db.get(`SELECT b.*, AVG(r.rating) as avg_rating 
            FROM books b 
            LEFT JOIN reviews r ON b.id = r.book_id 
            WHERE b.id = ? 
            GROUP BY b.id`, [bookId], callback);
  }
  
  static addReview(bookId, userId, rating, comment, callback) {
    db.run("INSERT INTO reviews (book_id, user_id, rating, comment) VALUES (?, ?, ?, ?)",
      [bookId, userId, rating, comment], callback);
  }
  
  static getReviews(bookId, callback) {
    db.all(`SELECT r.*, u.name 
            FROM reviews r 
            JOIN users u ON r.user_id = u.id 
            WHERE r.book_id = ?`, [bookId], callback);
  }
}

class EventService {
  static getAllEvents(callback) {
    db.all("SELECT * FROM events ORDER BY date ASC", callback);
  }
  
  static addEvent(event, userId, callback) {
    const { title, date, location } = event;
    db.run("INSERT INTO events (title, date, location, created_by) VALUES (?, ?, ?, ?)",
      [title, date, location, userId], callback);
  }
}

module.exports = { BookService, EventService };
