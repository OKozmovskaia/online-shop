const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
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
    inStock: {
      type: Boolean,
      default: true
    }
});

module.exports = Product = mongoose.model('product', ProductSchema);