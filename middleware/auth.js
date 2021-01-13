const jwtoken = require('jsonwebtoken');
const config = require('config');
// const User = require('../models/User')

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  // Check if not token
  if(!token) {
    return res.status(401).send({ msg: 'Authorization denied' });
  };

  // Verify token
  try {
    const decoded = jwtoken.verify(token, config.get('tokenSecret'));
    // const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).send({ msg: 'Please authenticate' });
  }
}