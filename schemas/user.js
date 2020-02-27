const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  telephone: String,
  nickName: String,
  location: String,
  password: String,
  email: String,
  favoriteProducts: [
    {
      id: String
    }
  ],
  viewedProducts: [
    {
      id: String
    }
  ],
  orders: Array
});

module.exports = mongoose.model("User", userSchema);
