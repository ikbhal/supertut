const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const router = express.Router();
const db = new sqlite3.Database('./data/teachers.db');

// List Reviews for a Teacher
router.get('/:id/reviews', (req, res) => {
  const teacherId = req.params.id;

  db.all(
    'SELECT * FROM reviews WHERE teacher_id = ?',
    [teacherId],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
      } else {
        res.json(rows);
      }
    }
  );
});

// Add Review for a Teacher
router.post('/:id/reviews', (req, res) => {
  const teacherId = req.params.id;
  const { reviewedBy, text } = req.body;

  db.run(
    'INSERT INTO reviews (teacher_id, reviewedBy, text) VALUES (?, ?, ?)',
    [teacherId, reviewedBy, text],
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
      } else {
        res.status(201).json({ message: 'Review added successfully' });
      }
    }
  );
});

// Delete Review for a Teacher
router.delete('/:id/reviews/:reviewId', (req, res) => {
  const teacherId = req.params.id;
  const reviewId = req.params.reviewId;

  db.run('DELETE FROM reviews WHERE id = ? ', [reviewId], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Server error' });
    } else {
      res.json({ message: 'Review deleted successfully' });
    }
  });
});

module.exports = router;
