module.exports = (app, db) => {
  //save the score
  app.post('/save_score', (req, res) => {
    const { username, score, level } = req.body;
    if (!username || !score || !level) return res.status(400).json({ message: 'All fields required' });

    //select
    const getUserQuery = 'SELECT id FROM users WHERE username = ?';
    db.query(getUserQuery, [username], (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length === 0) return res.status(400).json({ message: 'User not found' });

      const userId = results[0].id;
      const insertScore = 'INSERT INTO scores (user_id, score, level) VALUES (?, ?, ?)';
      db.query(insertScore, [userId, score, level], (err2) => {
        if (err2) return res.status(500).json({ message: 'Database error' });
        res.json({ success: true, message: 'Score saved' });
      });
    });
  });
};
