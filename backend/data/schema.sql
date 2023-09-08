 CREATE TABLE IF NOT EXISTS teachers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      hourlyFee INTEGER,
      responseTime TEXT,
      totalStudents INTEGER,
      photo TEXT,
      title TEXT,
      about TEXT,
      aboutLesson TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  teacher_id INTEGER REFERENCES teachers(id),
  reviewedBy TEXT,
  text TEXT,
  
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- // rating INTEGER DEFAULT 0,
ALTER TABLE reviews
ADD COLUMN rating INTEGER DEFAULT 0;

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