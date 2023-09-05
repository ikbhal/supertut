const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Specify the database file path
const dbFilePath = 'teachers.db';
const db = new sqlite3.Database(dbFilePath);

// Load the JSON data
const teachersData = require('./teachers.json');

// Insert the data into the teachers table
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS teachers (id INTEGER PRIMARY KEY, name TEXT, hourlyFee REAL, responseTime TEXT, totalStudents INTEGER, photo TEXT, title TEXT, about TEXT, aboutLesson TEXT)');

  const insertStatement = db.prepare('INSERT INTO teachers (name, hourlyFee, responseTime, totalStudents, photo, title, about, aboutLesson) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

  teachersData.forEach((teacher) => {
    insertStatement.run(
      teacher.name,
      teacher.hourlyFee,
      teacher.responseTime,
      teacher.totalstudents,
      teacher.photo,
      teacher.title,
      teacher.about,
      teacher.aboutLesson
    );
  });

  insertStatement.finalize();

  console.log('Teachers data inserted successfully.');
});

// Close the database connection
db.close();
