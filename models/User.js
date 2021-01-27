const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
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
  }]
});

module.exports = User = mongoose.model('user', UserSchema);