const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
  const cookie = req.cookies;
  try {
    for (let prop in cookie) {
      if (!cookie.hasOwnProperty(prop)) {
          continue;
      }    
      res.cookie(prop, '', {expires: new Date(0)});
  }

    res.render('index');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');   
  }
});

module.exports = router;