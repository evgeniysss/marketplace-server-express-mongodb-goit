const express = require("express");
let router = express.Router();

const mongoose = require("mongoose");
const Order = require("../../models/orders");

const checkOrder = orderToCheck => {
  const creator = orderToCheck.creator;
  const productsList = orderToCheck.productsList;
  const deliveryType = orderToCheck.deliveryType;
  const deliveryAdress = orderToCheck.deliveryAdress;
  const sumToPay = orderToCheck.sumToPay;
  if (
    typeof creator === "string" &&
    typeof productsList === "object" &&
    typeof deliveryType === "string" &&
    typeof deliveryAdress === "string" &&
    typeof sumToPay === "number"
  )
    return true;
  else return false;
};

router.get("/:orderId", (req, res) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then(item => {
      console.log(item);
      res.status(200).json({
        status: "success",
        order: item
      });
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ error: "404" });
    });
});

router.get("/", (req, res) => {
  Order.find()
    .exec()
    .then(items => {
      console.log(items);
      res.status(200).json(items);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res) => {
  if (checkOrder(req.body)) {
    console.log("Validation complete!");
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
  } else {
    console.log("Validation error!");
    res
      .status(400)
      .json({ error: "failed, you must enter correct type of data" });
  }
});

module.exports = router;
