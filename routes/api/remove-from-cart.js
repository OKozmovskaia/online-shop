const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwtoken = require('jsonwebtoken');
const config = require('config');
const bodyParser = require('body-parser');

const Order = require('../../models/Order');
const Product = require('../../models/Product');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post('/', auth, urlencodedParser, async (req,res) => {
  console.log("Deleting product-item")
  // define order token
  const order_token = req.cookies.token_order_cookie;
  const decoded_order = jwtoken.verify(order_token, config.get('tokenSecret'));
  const { idOrder } = decoded_order.order;

  // define product which choose user
  const { product_id_in_order } = req.body;

  // Remove new product to exist order
  const removeProductFromOrder = await Order.findByIdAndUpdate( idOrder, { 
    $pull: {productList: { _id: product_id_in_order }}
    }, { 'new': true, useFindAndModify: false }).exec();

  console.log("Removed Product: ", removeProductFromOrder);

  res.redirect('/api/cart');
});

module.exports = router;