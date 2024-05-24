"use strict";

// 모듈
const express = require("express");
const bodyParser = require("body-parser");  // 요청 body를 파싱해주는 모듈
const app = express();

// 라우팅
const userRouter = require("./src/routes/user/user"); // 경로 수정

app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", userRouter);  // 경로 수정

module.exports = app;