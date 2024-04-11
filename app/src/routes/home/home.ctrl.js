"use strict";

const logger = require("../../config/logger");
const User = require("../../models/User");

const output = {
  // view부분을 output으로 묶어서 가독성 좋게
  home: (req, res) => {
    logger.info(`GET / 304 "홈 화면으로 이동"`);
    res.render("home/index");
  },

  login: (req, res) => {
    logger.info(`GET /login 304 "로그인 화면으로 이동"`);
    res.render("home/login");
  },

  register: (req, res) => {
    logger.info(`GET /register 304 "회원가입 화면으로 이동"`);
    res.render("home/register");
  },
};

const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    const url = {
      method: "POST",
      path: "/login",
      status: response.err ? 400 : 200, // 200: 정상, 300: 페이지 이동, 400: 클라이언트 실수, 500: 서버 실수
    };
    log(response, url);
    return res.status(url.status).json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    const url = {
      method: "POST",
      path: "/register",
      status: response.err ? 400 : 201, // 새로운 데이터 생성은 201, 만약 같은 아이디로 생성하려 했을때는 409, 그외 DB 조작 문제면 서버 이슈이므로 500
    };
    log(response, url);
    return res.status(url.status).json(response);
  },
};

module.exports = {
  output,
  process,
};

const log = (response, url) => {
  if (response.err) {
    logger.error(
      `${url.method} ${url.path} ${url.status} Response: "${response.success} ${
        response.msg || ""
      }"`
    );
  } else {
    logger.info(
      `${url.method} ${url.path} ${url.status} Response: "${response.success} ${
        response.msg || ""
      }"`
    );
  }
};
