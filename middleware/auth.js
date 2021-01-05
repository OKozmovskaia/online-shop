const jwtoken = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  const token = req.header('x-auth-token');

  // Check if not token
  if(!token) {
    return res.status(401).send({ msg: 'No token, authorization denied' });
  };

  // Verify token
  try {
    const decoded = jwtoken.verify(token, config.get('tokenSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).send({ msg: 'Token is not valid' });
  }
}