"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

router.get("/user", ctrl.output.userlist);

module.exports = router;
