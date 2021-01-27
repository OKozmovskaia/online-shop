const express = require('express');
const router = express.Router();
const { check, validationResult, body } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwtoken = require('jsonwebtoken');
const config = require('config');
const bodyParser = require('body-parser');

const User = require('../../models/User');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// @route     POST api/user
// @desc      Register
// @access    Public

router.post('/', urlencodedParser, [
  check('firstName', 'First Name is required').not().isEmpty(),
  check('lastName', 'Last Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({min: 6})
],
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
     return res.status(400).json({errors: errors.array()});
  }
  const { firstName, lastName, email, password } = req.body;

  try {
    // See if user exist
    let user = await User.findOne({ email });
    if(user) {
      res.status(400).json({msg: 'User already exists'});
    };

    // Init new user
    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      }
    };
    const token = jwtoken.sign(
      payload,
      config.get('tokenSecret')
     );
    
    res.cookie('token_cookie', token, {maxAge:900000, httpOnly: true}).render('index');
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }  
});

module.exports = router;