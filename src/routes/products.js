const express = require("express");
let router = express.Router();

const mongoose = require("mongoose");
const Product = require("../../models/products");

const { validationResult, checkSchema } = require("express-validator/check");

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
      res.status(404).json({ error: "Product not found" });
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

router.post(
  "/",
  checkSchema({
    sku: { isNumber: true },
    name: { isString: true },
    description: { isString: true },
    price: { isString: true },
    currency: { isString: true },
    creatorId: { isNumber: true },
    categories: { isArray: true }
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      console.log("Validation complete!");
      const product = new Product({
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
        .status(400)
        .json({ error: "failed, you must enter correct type of data" });
    }
  }
);

router.put(
  "/:productId",
  checkSchema({
    likes: { isNumber: true }
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const id = req.params.productId;
      const reqBody = req.body;
      const newValueKey = Object.keys(reqBody).toString();
      const newValue = +Object.values(reqBody);
      const newObj = new Object();
      newObj[newValueKey] = newValue;

      Product.update({ _id: id }, { $set: newObj })
        .exec()
        .then(result => {
          res.status(200).json({ status: "success" });
        });
    } else {
      console.log("Validation error!");
      res
        .status(400)
        .json({ error: "failed, you must enter correct type of data" });
    }
  }
);

module.exports = router;
