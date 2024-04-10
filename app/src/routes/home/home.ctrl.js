"use strict";

const output = {
  // view부분을 output으로 묶어서 가독성 좋게
  home: (req, res) => {
    res.render("home/index");
  },

  login: (req, res) => {
    res.render("home/login");
  },
};

const users = {
  id: ["test1", "test2", "test3"],
  psword: ["1234", "2345", "3456"],
};

const process = {
  login: (req, res) => {
    const id = req.body.id,
      psword = req.body.psword;

    // 로그인 검사
    if(users.id.includes(id)){
      const idx = users.id.indexOf(id);
      if(users.psword[idx] === psword){
        return res.json({ // 응답 json
          success: true,
        })
      }
    }
    return res.json({  
      success: false,
      msg: '로그인에 실패하셨습니다.',
    })
  },
};

module.exports = {
  output,
  process,
};
