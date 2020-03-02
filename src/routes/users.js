const express = require("express");
const bodyParser = require("body-parser");
let jsonParser = bodyParser.json();
let router = express.Router();

const mongoose = require("mongoose");
const User = require("../../schemas/user");

const checkUser = userToCheck => {
  const firstName = userToCheck.firstName;
  const lastName = userToCheck.lastName;
  const nickName = userToCheck.nickName;
  const location = userToCheck.password;
  const password = userToCheck.password;
  if (
    typeof firstName === "string" &&
    typeof lastName === "string" &&
    typeof nickName === "string" &&
    typeof location === "string" &&
    typeof password === "string"
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
      res.status(500).json({ error: err });
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

router.post("/", jsonParser, (req, res) => {
  if (checkUser(req.body)) {
    console.log("Validation complete!");
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
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

router.patch("/:userId", jsonParser, (req, res) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(item => {
      console.log(item);
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put("/:userId", jsonParser, (req, res) => {
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
      res.status(500).json({ error: err });
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

router.delete("/:userId", (req, res) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(item => {
      console.log(item);
      res.status(200).json(item);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
