"use strict";
const UserStorage = require("../../models/UserStorage");

const output = {
  // view부분을 output으로 묶어서 가독성 좋게
  home: (req, res) => {
    res.render("home/index");
  },

  login: (req, res) => {
    res.render("home/login");
  },
};

const process = {
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;
    const users = UserStorage.getUsers("id","psword");
    const response = {};
    // // 로그인 검사
    if(users.id.includes(id)){
      const idx = users.id.indexOf(id);
      if(users.psword[idx] === psword){
        response.success = true
        return res.json(response);
      }
    }
    response.success = false;
    response.msg = "로그인에 실패하셨습니다.";
    return res.json(response);
  },
};

module.exports = {
  output,
  process,
};
