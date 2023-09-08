const express = require('express');
const router = express.Router();

// Import your database connection and any other necessary modules here
const db = new sqlite3.Database('./data/teachers.db');

// Define the booking route
router.post('/:teacherId/reserver_classes', (req, res) => {
  const teacherId = req.params.teacherId;
  const {
    teacher_name,
    student_id,
    book_type,
    book_date,
    booking_for_other,
    student_contact_mobile_number,
    student_address,
    booking_message
  } = req.body;

  // Validate the input data as needed

  // Insert the booking data into the "book" table
  const sql = `
    INSERT INTO reserve_classes (
      teacher_id,
      teacher_name,
      student_id,
      book_type,
      book_date,
      booking_for_other,
      student_contact_mobile_number,
      student_address,
      booking_message
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    teacherId,
    teacher_name,
    student_id,
    book_type,
    book_date,
    booking_for_other,
    student_contact_mobile_number,
    student_address,
    booking_message
  ];

  db.run(sql, params, function (err) {
    if (err) {
      console.error('Error inserting reserver_class table:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // The inserted row's ID can be accessed using this.lastID
      res.json({
        teacherId,
        teacher_name,
        student_id,
        book_type,
        book_date,
        booking_for_other,
        student_contact_mobile_number,
        student_address,
        booking_message,
        id: this.lastID, // Include the ID of the inserted booking
        message: 'Class booked successfully'
      });
    }
  });
});


// Retrieve All Bookings for a Specific Teacher
router.get('/teachers/:teacherId/reserve_classes', (req, res) => {
  const teacherId = req.params.teacherId;

  // Query the "book" table to retrieve bookings for the specified teacher
  db.all('SELECT * FROM reserve_classes WHERE teacher_id = ?', [teacherId], (err, bookings) => {
    if (err) {
      console.error('Error fetching reserve_classes:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(bookings);
    }
  });
});

// Retrieve All Bookings for a Specific Student
router.get('/students/:studentId/reserve_classes', (req, res) => {
  const studentId = req.params.studentId;

  // Query the "book" table to retrieve bookings for the specified student
  db.all('SELECT * FROM reserve_classes WHERE student_id = ?', [studentId], (err, bookings) => {
    if (err) {
      console.error('Error fetching reserve_classes:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(bookings);
    }
  });
});

// Retrieve All Bookings Irrespective of Teacher or Student
router.get('/reserve_classes', (req, res) => {
  // Query the "book" table to retrieve all bookings
  db.all('SELECT * FROM book', (err, bookings) => {
    if (err) {
      console.error('Error fetching bookings:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(bookings);
    }
  });
});

// work on api to retireve one reserve_class row by reserver_classes id 
router.get('/reserve_classes/:reserve_classId', (req, res) => {
  const reserve_classId = req.params.reserve_classId;
  
  db.get('SELECT * FROM reserve_classes WHERE id = ?', [reserve_classId], (err, row) => {
    if (err) {
      console.error('Error fetching reserve_class:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'reserve_class not found' });
    }
  });
});

// work on delete one reserve_class row by reserver_classes id
router.delete('/reserve_classes/:reserve_classId', (req, res) => {
  const reserve_classId = req.params.reserve_classId;

  db.run('DELETE FROM reserve_classes WHERE id = ?', [reserve_classId], function (err) {
    if (err) {
      console.error('Error deleting reserve_class:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (this.changes) {
      res.json({ message: 'reserve_class deleted successfully' });
    } else {
      res.status(404).json({ error: 'reserve_class not found' });
    }
  });
});

module.exports = router;
