const express = require("express");
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();

const mongoose = require("mongoose");
const Product = require("../../schemas/products");

const checkProduct = productToCheck => {
  const sku = productToCheck.sku;
  const name = productToCheck.name;
  const description = productToCheck.description;
  const categories = productToCheck.categories;
  if (
    typeof sku === "number" &&
    typeof name === "string" &&
    typeof description === "string" &&
    typeof categories === "object"
  )
    return true;
  else return false;
};

router.get("/:productId", (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(item => {
      console.log(item);
      res.status(200).json({
        status: "success",
        product: item
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/", (req, res) => {
  Product.find()
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

router.post("/", jsonParser, (req, res) => {
  if (checkProduct(req.body)) {
    console.log("Validation complete!");
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      sku: req.body.sku,
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      currency: req.body.currency,
      creatorId: req.body.creatorId,
      created: req.body.created,
      modified: req.body.modified,
      categories: [
        {
          category: req.body.categories[0]
        }
      ],
      likes: req.body.likes
    });

    product
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          status: "success",
          product: product
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  } else {
    console.log("Validation error!");
    res
      .status(500)
      .json({ error: "failed, you must enter correct type of data" });
  }
});

router.put("/:productId", jsonParser, (req, res) => {
  const id = req.params.productId;
  const reqBody = req.body;
  const newValueKey = Object.keys(reqBody).toString();
  const newValue = +Object.values(reqBody);
  const newObj = new Object();
  newObj[newValueKey] = newValue;

  Product.findById(id)
    .exec()
    .then(item => {
      console.log(item);
      res.status(200).json({
        status: "success",
        product: item
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });

  Product.update({ _id: id }, { $set: newObj })
    .exec()
    .then(item => {
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
