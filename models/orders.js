const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  creator: String,
  productsList: [
    {
      product: String,
      orderType: String,
      itemsCount: Number
    }
  ],
  deliveryType: String,
  deliveryAdress: String,
  sumToPay: Number,
  status: String
});

module.exports = mongoose.model("Order", orderSchema);
