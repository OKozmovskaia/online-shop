const express = require('express');
const router = express.Router();

const Product = require('../../models/Product');


router.get('/', async (req, res) => {
    const arrayProducts = await Product.find().exec();

    res.setHeader('Content-Type', 'text/html');
    res.render('gallery', {products: arrayProducts});
});

module.exports = router;