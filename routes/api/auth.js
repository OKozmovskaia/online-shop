const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwtoken = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');


// @route     GET api/auth
// @desc      Test route
// @access    Public

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');   
  }
});

// @route     POST api/auth
// @desc      Authenticate user and get token
// @access    Public

router.post('/',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required ').exists(),
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
     return res.status(400).json({errors: errors.array()})
  }
  const { email, password } = req.body;

  try {
    // See if user exist
    let user = await User.findOne({ email });
    if(!user) {
      res.status(400).json({msg: 'Invalid Credentials'});
    }

    // Match the password
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) {
      res.status(400).json({msg: 'Invalid Credentials'});
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      }
    }
    jwtoken.sign(
      payload,
      config.get('tokenSecret'),
      { expiresIn: 36000  },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }  
});



module.exports = router;