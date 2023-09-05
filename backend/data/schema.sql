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
    )