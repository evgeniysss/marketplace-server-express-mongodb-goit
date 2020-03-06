const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const config = require("./config");
let app = express();

// mongoose.connect(
//   config.mongodb_url,
//   { useNewUrlParser: true, useUnifiedTopology: true },
//   function(err) {
//     if (err) throw err;
//     console.log("☆☆☆ Connected to Data Base! ☆☆☆");
//   }
// );

let home = require("./src/routes/home");
let products = require("./src/routes/products");
let users = require("./src/routes/users");
let orders = require("./src/routes/orders");

// app.use("/", home);
// app.use("/products", products);
// app.use("/users", users);
// app.use("/orders", orders);

// app.listen(config.port, () => {
//   console.log(
//     "☆☆☆ Server ready to accept requests on port:",
//     config.port,
//     "☆☆☆"
//   );
// });

if (require.main === module) {
  main();
} else {
  module.exports = main;
}

async function main() {
  app.use(bodyParser());
  app.use("/", home);
  app.use("/products", products);
  app.use("/users", users);
  app.use("/orders", orders);

  await mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log("attaching server to port");
  const server = app.listen(config.port, () => {
    console.log("☆☆☆ Server listening on port", config.port, "☆☆☆");
  });

  return { app, server };
}
