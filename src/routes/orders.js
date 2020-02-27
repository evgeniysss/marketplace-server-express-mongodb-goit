const express = require("express");
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();

const mongoose = require("mongoose");
const Order = require("../../schemas/orders");

router.get("/:orderId", (req, res) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then(doc => {
      console.log(doc);
      res.status(200).json({
        status: "success",
        order: doc
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res) => {
  Order.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", jsonParser, (req, res) => {
  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    creator: req.body.creator,
    productsList: req.body.productsList,
    deliveryType: req.body.deliveryType,
    deliveryAdress: req.body.deliveryAdress,
    sumToPay: req.body.sumToPay,
    status: req.body.status
  });

  order
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        status: "success",
        order: order
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
