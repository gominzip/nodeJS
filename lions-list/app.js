"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const userRouter = require("./src/routes/user/user");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use("/", userRouter);

module.exports = app;
