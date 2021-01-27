const jwtoken = require('jsonwebtoken');
const config = require('config');


module.exports = function(req, res, next) {
  const token = req.cookies.token_cookie;
  
  // Check if not token
  if(!token) {
    return res.status(401).render('error', { msg: 'Authorization denied. Please, sign in or register.' });
  };

  // Verify token
  try {
    const decoded = jwtoken.verify(token, config.get('tokenSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).send({ msg: 'Please authenticate' });
  }
}