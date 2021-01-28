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
  // define user
  const token = req.cookies.token_cookie;
  const decoded = jwtoken.verify(token, config.get('tokenSecret'));
  const { id } = decoded.user
  console.log("id User: ", id);

  // define product which choose user
  const { id_product, id_price } = req.body;
  console.log("id Product: ", id_product, "id_price: ", id_price);

  // define order token
  const order_token = req.cookies.token_order_cookie;

  // get all products from db for render page
  const arrayProducts = await Product.find().exec();

  if(!order_token) {
    console.log("Work with new order");
    // Create new order
    try {
      // Init new order
      const order = new Order({
        user: id,
        productList: {
          product: id_product,
          quantity: 1,
          total: id_price
        }
      });
  
      await order.save();
  
      // Return jsonwebtoken for new order
      const payload = {
        order: {
          idOrder: order.id,
        }
      };
  
      console.log("Payload: ", payload);
  
      const token_order = jwtoken.sign(
        payload,
        config.get('tokenSecret')
       );
      
      res.cookie('token_order_cookie', token_order, { httpOnly: true}).render('gallery', {products: arrayProducts});
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error Add to card');
    }


  } else {
    console.log("Work with exist order");
    // decoding token order
    const decoded_order = jwtoken.verify(order_token, config.get('tokenSecret'));
    const { idOrder } = decoded_order.order;
    console.log("Order: ", idOrder);

    // Add new product to exist order
    const addProductToOrder = await Order.findByIdAndUpdate( idOrder, { 
      $push: {
        productList: {
          product: id_product,
          quantity: 1,
          total: id_price
        }
      }
    }, { 'new': true, useFindAndModify: false }).exec();

    res.render('gallery', {products: arrayProducts});
  }
  
});

module.exports = router;