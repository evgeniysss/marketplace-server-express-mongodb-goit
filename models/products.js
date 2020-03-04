const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  sku: Number,
  name: String,
  description: String,
  price: Number,
  currency: String,
  creatorId: String,
  created: {
    type: Date,
    default: Date.now
  },
  modified: Date,
  categories: [
    {
      category: String
    }
  ],
  likes: Number
});

module.exports = mongoose.model("Product", productSchema);
