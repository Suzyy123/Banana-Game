module.exports = (app, db) => {
  // Register user
  app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'All fields are required' });

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'Username already exists' });
        return res.status(500).json({ message: 'Database error' });
      }
      res.status(200).json({ message: 'User registered', userId: result.insertId });
    });
  });

  // Login user
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'All fields are required' });

    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length === 0) return res.status(401).json({ success: false, message: 'Invalid username or password' });

      res.status(200).json({
        success: true,
        message: 'Login successful',
        username: results[0].username,
        userId: results[0].id
      });
    });
  });
};
