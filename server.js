const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// render html
app.engine('ejs', require('ejs-locals'));
app.set('views', (__dirname, 'views'));
app.set('view engine', 'ejs');

// Connect DB
connectDB();

// Render html-pages
app.use(express.static(path.join(__dirname, 'public')));

// Init middleware
app.use(express.json({ extended: false }));



app.get('/', (req,res) => {
  res.send('API Running');
  res.render('index');
});

// Define router
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/account', require('./routes/api/account'));
app.use('/api/about', require('./routes/api/about'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

