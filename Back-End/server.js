const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'noor',
  database: 'blogdb'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to MySQL DB');
});

// ------------------ User Registration ------------------
app.post('/register', async (req, res) => {
  const { name, phone, email, password } = req.body;

  if (!name || !phone || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (name, phone, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [name, phone, email, hashedPassword], (err, result) => {
      if (err) {
        console.error("MySQL Error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'Email already exists' });
        }
        return res.status(500).json({ error: 'Database error' });
      }

      return res.status(200).json({ message: 'User registered successfully!' });
    });
  } catch (err) {
    console.error("Hashing Error:", err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// ------------------ User Login ------------------
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Login successful' });
  });
});

// ------------------ Blog Posts API ------------------

// Create a new post
app.post('/api/posts', (req, res) => {
  const { title, content, date, author, category } = req.body;

  if (!title || !content || !date || !author || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const query = 'INSERT INTO posts (title, content, date, author, category) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, content, date, author, category], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Post created successfully', postId: result.insertId });
  });
});

// Get all posts
app.get('/api/posts', (req, res) => {
  db.query('SELECT * FROM posts ORDER BY id DESC', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Get posts by category
app.get('/api/posts/category/:category', (req, res) => {
  const { category } = req.params;
  db.query('SELECT * FROM posts WHERE category = ? ORDER BY id DESC', [category], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Delete a post
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM posts WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Post is deleted' });
  });
});

// Update a post
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, date, author, category } = req.body;

  db.query(
    'UPDATE posts SET title = ?, content = ?, date = ?, author = ?, category = ? WHERE id = ?',
    [title, content, date, author, category, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Post updated' });
    }
  );
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
