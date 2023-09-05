const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const reviewsRouter = require('./reviews_router'); // Adjust the path if needed


// Specify the database file path
const dbFilePath = 'data/teachers.db';
const db = new sqlite3.Database(dbFilePath);

const app = express();
const PORT = 7000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Mount the reviews router at a specific base path
app.use('/api/v2/teachers', reviewsRouter);

app.get('/ping', (req, res) => {
  res.send('Pong!');
});


app.get('/api/v1/teachers', (req, res) => {
  // return teachers.json at ../data/teachers.json
  res.sendFile(path.join(__dirname, 'data', 'teachers.json'));
});

app.post('/data', (req, res) => {
  const requestData = req.body;
  console.log('Received JSON data:', requestData);
  res.json({ message: 'Data received successfully' });
});

//v2 with sqlite
// POST /teachers
app.post('/api/v2/teachers', (req, res) => {
  const {
    name,
    hourlyFee,
    responseTime,
    totalStudents,
    photo,
    title,
    about,
    aboutLesson,
  } = req.body;

  const createdAt = new Date();
  const updatedAt = new Date();

  db.run(
    'INSERT INTO teachers (name, hourlyFee, responseTime, totalStudents, photo, title, about, aboutLesson, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      name,
      hourlyFee,
      responseTime,
      totalStudents,
      photo,
      title,
      about,
      aboutLesson,
      createdAt,
      updatedAt,
    ],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});


// Define route to get teachers filtered by rate
// TODO reviews missing
// TODO pagination for teachers
app.get('/api/v2/teachers', (req, res) => {
  const { rateFrom, rateTo, pageNumber, pageSize } = req.query;

  let query = 'SELECT * FROM teachers';
  let params = [];

  if (rateFrom && rateTo) {
    query += ' WHERE hourlyFee >= ? AND hourlyFee <= ?';
    params.push(parseInt(rateFrom), parseInt(rateTo));
  } else if (rateFrom) {
    query += ' WHERE hourlyFee >= ?';
    params.push(parseInt(rateFrom));
  } else if (rateTo) {
    query += ' WHERE hourlyFee <= ?';
    params.push(parseInt(rateTo));
  }

  if (pageNumber && pageSize) {
    const offset = (parseInt(pageNumber) - 1) * parseInt(pageSize);
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(pageSize), offset);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching teachers:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(rows);
    }
  });
});


// Define route to get teacher by ID
app.get('/api/v2/teachers/:id', (req, res) => {
  const teacherId = req.params.id;

  db.get('SELECT * FROM teachers WHERE id = ?', [teacherId], (err, row) => {
    if (err) {
      console.error('Error fetching teacher:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  });
});



// Delete teacher by ID
app.delete('/api/v2/teachers/:id', (req, res) => {
  const teacherId = req.params.id;

  db.run('DELETE FROM teachers WHERE id = ?', [teacherId], function (err) {
    if (err) {
      console.error('Error deleting teacher:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (this.changes > 0) {
      res.json({ message: 'Teacher deleted successfully' });
    } else {
      res.status(404).json({ error: 'Teacher not found' });
    }
  });
});

// admin pages 
app.get('/admin', (req, res) => {
  db.all('SELECT * FROM teachers', (err, rows) => {
    if (err) {
      console.error('Error fetching teachers:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.render('admin', { teachers: rows });
    }
  });
});

// Admin Reviews Route
app.get('/admin/teachers/:teacherId/reviews', async (req, res) => {
  const teacherId = req.params.teacherId;
  try {
    res.render('admin_reviews', {
    });
  } catch (error) {
    console.error('Error fetching teacher details:', error);
    res.status(500).send('An error occurred while fetching teacher details');
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
