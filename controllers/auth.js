const dotenv = require("dotenv");
const mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const User = require("../models/user");
const { body, validationResult } = require("express-validator");

dotenv.config();

const signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const user = new User({
    email: req.body.email.toLowerCase(),
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }
    res.status(200).send({ msg: "User was registered successfully!", user });
  });
};

const signin = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ msg: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        msg: "Invalid Password!",
      });
    }

    var token = jwt.sign({ userId: user._id }, process.env.jwtSecret, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      accessToken: token,
    });
  });
};

const userDetail = (req, res) => {
  const userId = req.userId;
  User.findById(mongoose.Types.ObjectId(userId)).exec((err, user) => {
    if (err) {
      res.status(500).send({ msg: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ msg: "User Not found." });
    }

    res.status(200).send({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      id: user._id,
    });
  });
};

module.exports = {
  signup,
  signin,
  userDetail,
};
