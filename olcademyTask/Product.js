const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  sizes: [String],
  images: [String]
});

module.exports = mongoose.model('Product', productSchema);
