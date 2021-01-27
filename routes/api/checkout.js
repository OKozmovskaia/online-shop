const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwtoken = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {

    const token = req.cookies.token_cookie;
    const decoded = jwtoken.verify(token, config.get('tokenSecret'));
    const { id } = decoded.user;

    try {
        const user = await User.findOne({ _id: id }).exec();
        
        if(!user) {
        return res.status(400).render('error', { msg: 'Please, sign in' });
        };

        res.setHeader('Content-Type', 'text/html');
        res.render('checkout', {firstName: user.firstName, lastName: user.lastName});
        
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
 
});

module.exports = router;