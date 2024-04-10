"use strict";
const User = require("../../models/User");
const UserStorage = require("../../models/UserStorage");

const output = {
  // view부분을 output으로 묶어서 가독성 좋게
  home: (req, res) => {
    res.render("home/index");
  },
  login: (req, res) => {
    res.render("home/login");
  },
  register: (req, res) => {
    res.render("home/register");
  },
};

const process = {
  login: (req, res) => {
    const user = new User(req.body);
    const response = user.login();
    console.log(response);

    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
