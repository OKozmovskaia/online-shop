const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  orders: [{
    image: {
      type: String,
      require: true
    },
    product_name: {
      type: String,
      require: true
    },
    price: {
      type: Number,
      require: true
    },
    quantity: {
      type: Number,
      require: true
    },
    total: {
      type: Number,
      require: true
    },
    date: {
      type: Date,
      default: Date.now()
    }
  }],
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Account = mongoose.model('account', AccountSchema);
