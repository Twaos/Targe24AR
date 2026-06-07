const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password_hash TEXT
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    author TEXT,
    year INTEGER,
    genre TEXT,
    added_by INTEGER,
    FOREIGN KEY(added_by) REFERENCES users(id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    book_id INTEGER,
    user_id INTEGER,
    rating INTEGER,
    comment TEXT,
    FOREIGN KEY(book_id) REFERENCES books(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
  
  db.run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    date TEXT,
    location TEXT,
    created_by INTEGER,
    FOREIGN KEY(created_by) REFERENCES users(id)
  )`);
  
  db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
    if (row.count === 0) {
      db.run("INSERT INTO users (name, email, password_hash) VALUES ('Test Kasutaja', 'test@test.com', 'demo123')");
      db.run("INSERT INTO books (title, author, year, genre, added_by) VALUES ('1984', 'George Orwell', 1949, 'Dystopia', 1)");
      db.run("INSERT INTO books (title, author, year, genre, added_by) VALUES ('Süsteemiteooria', 'Märt Aro', 2020, 'IT', 1)");
      db.run("INSERT INTO events (title, date, location, created_by) VALUES ('Raamatuklubi kohtumine', '2026-06-15', 'TTHK raamatukogu', 1)");
    }
  });
});

module.exports = db;