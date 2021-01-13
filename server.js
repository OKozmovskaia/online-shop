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
  res.setHeader('Content-Type', 'text/html');
  res.render('index');
});

// Define router
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/account', require('./routes/api/account'));

app.use('/api/about', require('./routes/api/about'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/checkout', require('./routes/api/checkout'));
app.use('/api/contact', require('./routes/api/contact'));
app.use('/api/detail', require('./routes/api/detail'));
app.use('/api/gallery', require('./routes/api/gallery'));
app.use('/api/shop', require('./routes/api/shop'));
app.use('/api/wishlist', require('./routes/api/wishlist'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

