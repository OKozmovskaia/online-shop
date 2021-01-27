const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  productList: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      require: true
    },
    total: {
      type: Number,
      require: true
    }
  }],
  summary: {
    type: Number,
    require: true
  },
  discount: {
    type: Number,
    require: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Order = mongoose.model('order', OrderSchema); 