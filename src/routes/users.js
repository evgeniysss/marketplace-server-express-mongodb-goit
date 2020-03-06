const express = require("express");
let router = express.Router();

const mongoose = require("mongoose");
const User = require("../../models/user");

const { validationResult, checkSchema } = require("express-validator/check");

// const checkUser = userToCheck => {
//   const userName = userToCheck.user;
//   const telephone = userToCheck.telephone;
//   const password = userToCheck.password;
//   const email = userToCheck.email;
//   if (
//     typeof userName === "string" &&
//     typeof telephone === "string" &&
//     typeof password === "string" &&
//     typeof email === "string"
//   )
//     return true;
//   else return false;
// };

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(item => {
      console.log(item);
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(404).json({ error: "User not found" });
    });
});

router.get("/", (req, res) => {
  User.find()
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
    user: { isString: true },
    telephone: { isString: true },
    email: { isString: true },
    password: { isString: true }
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      console.log("Validation complete!");
      const user = new User({
        user: req.body.user,
        telephone: req.body.telephone,
        password: req.body.password,
        email: req.body.email
      });

      user
        .save()
        .then(result => {
          console.log(result);
          res.status(200).json({
            status: "success",
            user: user
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
  "/:userId",
  checkSchema({
    viewedProducts: { isArray: true }
  }),
  (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const id = req.params.userId;
      console.log("id :", id);
      const reqBody = req.body;
      console.log("req.body :", req.body);
      const newValueKey = Object.keys(reqBody).toString();
      const newValue = Object.values(reqBody);
      const newObj = {};
      newObj[newValueKey] = newValue;

      User.findById(id)
        .exec()
        .then(item => {
          console.log(item);
          res.status(200).json({
            status: "success",
            user: item
          });
        })
        .catch(err => {
          console.log(err);
          res.status(404).json({ error: "User not found" });
        });

      User.update({ _id: id }, { $set: newObj })
        .exec()
        .then(item => {
          res.status(200).json(item);
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

module.exports = router;
