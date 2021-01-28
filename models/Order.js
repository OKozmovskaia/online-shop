const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  productList: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      require: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      require: false
    }
  }],
  summary: {
    type: Number,
    require: false
  },
  discount: {
    type: Number,
    require: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Order = mongoose.model('order', OrderSchema); 