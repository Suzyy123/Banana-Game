const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '@mysqlroot123',
  database: 'banana_game'
});

db.connect(err => {
  if (err) console.error('❌ MySQL connection failed:', err);
  else console.log('✅ MySQL connected');
});

module.exports = db;
