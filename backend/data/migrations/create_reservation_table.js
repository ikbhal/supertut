const sqlite3 = require('sqlite3').verbose();

// Create a new SQLite database in memory (change the path to a file for a persistent database)
const db = new sqlite3.Database('../teachers.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Connected to the database');
    }
  });

// Define the schema for the "book" table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS reserve_classes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      teacher_id INTEGER,
      teacher_name TEXT,
      student_id INTEGER,
      booking_message TEXT,
      book_type TEXT,
      book_date TEXT,
      booking_for_other BOOLEAN,
      student_contact_mobile_number TEXT,
      student_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log('Book table created successfully.');

  // Close the database connection
  db.close();
});
