const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwtoken = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');
const Order = require('../../models/Order');
const Product = require('../../models/Product');

// @route     GET api/wishlist
// @desc      Get current user
// @access    Private

router.get('/', auth, async(req, res) => {
  const token = req.cookies.token_cookie;
  const decoded = jwtoken.verify(token, config.get('tokenSecret'));
  const { id } = decoded.user;

  // define order token
  const order_token = req.cookies.token_order_cookie;

  try {
    const user = await User.findOne({ _id: id }).exec();
    
    if(!user) {
      return res.status(400).render('error', { msg: 'Please, sign in' });
    };

    if(order_token) {
      // decoding token order
      const decoded_order = jwtoken.verify(order_token, config.get('tokenSecret'));
      const { idOrder } = decoded_order.order;
      console.log("Order: ", idOrder);

      // general info about order
      const order = await Order.findOne({ _id: idOrder })
                              .populate({path: 'productList', 
                                populate: {path: 'product', model: 'Product'}
                            })
                              .exec();

      const productsFromDB = order.productList;

      console.log("Order: ", order);

      res.setHeader('Content-Type', 'text/html');
      res.render('cart', {firstName: user.firstName, lastName: user.lastName, products: productsFromDB});

    } else {
      res.setHeader('Content-Type', 'text/html');
      res.render('cart', {firstName: user.firstName, lastName: user.lastName});
    }
    

    
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;