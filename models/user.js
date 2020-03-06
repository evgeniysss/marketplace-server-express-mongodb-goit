const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
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
