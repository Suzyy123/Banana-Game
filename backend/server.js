const express = require('express');
const cors = require('cors');
const db = require('./db/connection');

const app = express();
app.use(cors());
app.use(express.json());

// Import services
require('./services/userService')(app, db);
require('./services/scoreService')(app, db);
require('./services/leaderboardService')(app, db);

app.listen(3000, () => console.log('🚀 Server running on http://localhost:3000'));
