const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const axios = require('axios');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Routes
app.get('/', (req, res) => {
  res.render('page1', { movies: [] });
});
      
app.post('/search', async (req, res) => {
  try {
    const { searchQuery } = req.body;
    const response = await axios.get(`http://www.omdbapi.com/?s=${searchQuery}&apikey=${process.env.OMDB_API_KEY}`);

    const movies = response.data.Search || [];
    res.render('page1', { movies });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/favorites', (req, res) => {
  db.query('SELECT * FROM favorites', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.render('page2', { favorites: results });
    }
  });
});

app.post('/favorite', (req, res) => {
  const { title, year, type, poster } = req.body;

  db.query(
    'INSERT INTO favorites (title, year, type, poster) VALUES (?, ?, ?, ?)',
    [title, year, type, poster],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/favorites');
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
