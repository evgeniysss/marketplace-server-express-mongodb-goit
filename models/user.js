const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: String,
  telephone: String,
  password: String,
  email: String,
  favoriteProducts: [
    {
      id: Object
    }
  ],
  viewedProducts: [
    {
      id: Object
    }
  ],
  orders: [
    {
      order: Object
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
