"use strict";

const express = require("express");
const router = express.Router();
const ctrl = require("./home.ctrl");

router.get("/lionlist", ctrl.process.lionlist);
router.get("/liontest/question", ctrl.process.testlist);
router.post("/liontest/result", ctrl.process.testresult);

module.exports = router;
