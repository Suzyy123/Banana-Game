module.exports = (app, db) => {
  //scores get 
  app.get('/get_scores', (req, res) => {
    const query = `
      SELECT s.score, s.level, s.date_played, u.username 
      FROM scores s
      JOIN users u ON s.user_id = u.id
      ORDER BY s.date_played DESC
    `;
    db.query(query, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json(results);
    });
  });

  // delete or clear the score
  app.delete('/clear_scores', (req, res) => {
    const query = 'DELETE FROM scores';
    db.query(query, (err) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.json({ message: 'Leaderboard cleared' });
    });
  });
};

