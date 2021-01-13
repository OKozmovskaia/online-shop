const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render('cart');
});

module.exports = router;