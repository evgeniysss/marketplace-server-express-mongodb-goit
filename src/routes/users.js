const express = require("express");
let router = express.Router();

const mongoose = require("mongoose");
const User = require("../../models/user");

const checkUser = userToCheck => {
  const userName = userToCheck.user;
  const telephone = userToCheck.telephone;
  const password = userToCheck.password;
  const email = userToCheck.email;
  if (
    typeof userName === "string" &&
    typeof telephone === "string" &&
    typeof password === "string" &&
    typeof email === "string"
  )
    return true;
  else return false;
};

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

router.post("/", (req, res) => {
  if (checkUser(req.body)) {
    console.log("Validation complete!");
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      telephone: req.body.telephone,
      nickName: req.body.nickName,
      location: req.body.location,
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
      .status(500)
      .json({ error: "failed, you must enter correct type of data" });
  }
});

router.put("/:userId", (req, res) => {
  const id = req.params.userId;
  const reqBody = req.body;
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
});

module.exports = router;
