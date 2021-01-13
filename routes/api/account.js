const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Account = require('../../models/Account');
const User = require('../../models/User');

// @route     GET api/account/me
// @desc      Get current user
// @access    Private

router.get('/', auth, async(req, res) => {
  try {
    const account = await Account.findOne({user: req.user.id}).populate('user', ['firstName', 'lastName']);

    if(!account) {
      return res.status(400).json({ msg: 'There is no account for this user' });
    };

    res.render('account');
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;