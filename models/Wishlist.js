const mongoose = require('mongoose');

const WishListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productList: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }]
});

module.exports = WishList = mongoose.model('wishList', WishListSchema); 