const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const reviewsRouter = require('./reviews_router'); 
const reserveClassRouter = require('./reserve_class_router');


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
app.use('/api/v3/', reserveClassRouter);

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

  let query = 'SELECT * FROM teachers WHERE 1';
  let params = [];

  if (rateFrom && rateTo) {
    query += ' AND hourlyFee >= ? AND hourlyFee <= ?';
    params.push(parseInt(rateFrom), parseInt(rateTo));
  } else if (rateFrom) {
    query += ' AND hourlyFee >= ?';
    params.push(parseInt(rateFrom));
  } else if (rateTo) {
    query += ' AND hourlyFee <= ?';
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

app.get('/api/v3/teachers/:id', (req, res) => {
  const teacherId = req.params.id;

  // Initialize an object to store teacher details, reviews, totalReviews, and averageRating
  let responseObj = {};

  // Fetch teacher details
  db.get('SELECT * FROM teachers WHERE id = ?', [teacherId], (err, teacher) => {
    if (err) {
      console.error('Error fetching teacher:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (!teacher) {
      res.status(404).json({ error: 'Teacher not found' });
    } else {
      // Spread the properties of the teacher object into the responseObj
      responseObj = { ...teacher };

      // Fetch reviews for the teacher
      db.all('SELECT * FROM reviews WHERE teacher_id = ?', [teacherId], (err, reviews) => {
        if (err) {
          console.error('Error fetching reviews:', err.message);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Store reviews in the response object
          responseObj.reviews = reviews;

          // Calculate totalReviews and averageRating
          responseObj.totalReviews = reviews.length;
          if (reviews.length > 0) {
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            responseObj.averageRating = Math.round(averageRating);
          } else {
            responseObj.averageRating = 0; // Default value if there are no reviews
          }

          // Send the combined response
          res.json(responseObj);
        }
      });
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


// Update the route to render the admin reserve classes view
app.get('/admin/teachers/:teacherId/reserve_classes', (req, res) => {
  const teacherId = req.params.teacherId;

  // Call the fetchReserveClassesForTeacher function to retrieve reserve classes
  fetchReserveClassesForTeacher(teacherId, (err, reserveClasses) => {
    if (err) {
      console.error('Error fetching reserve classes:', err.message);
      // Handle the error as needed, such as rendering an error page or sending a JSON response
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Render the 'admin_reserve_classes.ejs' view with the reserve classes data
      res.render('admin_reserve_classes', { reserveClasses });
    }
  });
});


function fetchReserveClassesForTeacher(teacherId, callback) {
  const query = 'SELECT * FROM reserve_classes WHERE teacher_id = ?';

  db.all(query, [teacherId], (err, rows) => {
    if (err) {
      console.error('Error fetching reserve classes:', err.message);
      callback(err, null);
    } else {
      // Return the array of reserve classes for the teacher
      callback(null, rows);
    }
  });
}

// v3 begin  -> reviews merge 
app.get('/api/v3/teachers', (req, res) => {

  const { rateFrom, rateTo, pageNumber, pageSize } = req.query;

  let query = 'SELECT * FROM teachers WHERE 1';
  let params = [];

  if (rateFrom && rateTo) {
    query += ' AND hourlyFee >= ? AND hourlyFee <= ?';
    params.push(parseInt(rateFrom), parseInt(rateTo));
  } else if (rateFrom) {
    query += ' AND hourlyFee >= ?';
    params.push(parseInt(rateFrom));
  } else if (rateTo) {
    query += ' AND hourlyFee <= ?';
    params.push(parseInt(rateTo));
  }

  if (pageNumber && pageSize) {
    const offset = (parseInt(pageNumber) - 1) * parseInt(pageSize);
    query += ' LIMIT ? OFFSET ?';
    params.push(parseInt(pageSize), offset);
  }

  db.all(query, params, (err, teachers) => {
    if (err) {
      console.error('Error fetching teachers:', err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Fetch reviews for each teacher
      const promises = teachers.map(teacher => {
        return new Promise((resolve, reject) => {
          db.all('SELECT * FROM reviews WHERE teacher_id = ?', [teacher.id], (err, reviews) => {
            if (err) {
              reject(err);
            } else {
              teacher.reviews = reviews;

               // Calculate totalReviews and averageRating
               teacher.totalReviews = reviews.length;
               if (reviews.length > 0) {
                 const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
                 teacher.averageRating = Math.round(totalRating / reviews.length);
               } else {
                 teacher.averageRating = 0; // Default value if there are no reviews
               }
               
              resolve();
            }
          });
        });
      });

      // Wait for all promises to complete
      Promise.all(promises)
        .then(() => {
          res.json(teachers);
        })
        .catch(error => {
          console.error('Error fetching reviews:', error.message);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    }
  });
});


// v3 end


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
