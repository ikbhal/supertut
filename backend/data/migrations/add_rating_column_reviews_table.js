const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database('../teachers.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database');
  }
});

// SQL command to add the 'rating' column with a default value of 0
const sql = `
  ALTER TABLE reviews
  ADD COLUMN rating INTEGER DEFAULT 0;
`;

// Execute the SQL command
db.run(sql, (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Added the rating column to the reviews table');
  }

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('Closed the database connection');
    }
  });
});
