const express = require("express");
let app = express();
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://evgeniy:GRzGyN1mc132o0mZ@cluster0-cg5kf.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) throw err;
    console.log("☆☆☆ Connected to Data Base! ☆☆☆");
  }
);

let port = 3000;

let home = require("./src/routes/home");
let products = require("./src/routes/products");
let users = require("./src/routes/users");
let orders = require("./src/routes/orders");

app.listen(port, () => {
  console.log("☆☆☆ Server ready to accept requests on port:", port, "☆☆☆");
});

app.use("/", home);
app.use("/products", products);
app.use("/users", users);
app.use("/orders", orders);
