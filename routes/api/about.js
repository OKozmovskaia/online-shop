const express = require('express');
const router = express.Router();

// @route     GET api/account/me
// @desc      Get current user
// @access    Private

router.get('/', (req, res) => {
    res.status(200).send('Render page about us');
    res.render('about');
});

module.exports = router;