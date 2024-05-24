"use strict";

const lions = require("../../databases/lions.json");

const output = {
  userlist: (req, res) => {
    let filteredUsers = lions;

    // 성별 필터링
    const gender = req.query.gender;
    if (gender) {
      filteredUsers = filteredUsers.filter(
        (user) => user.gender.toLowerCase() === gender.toLowerCase()
      );
    }

    // 파트 필터링
    const part = req.query.part;
    if (part) {
      filteredUsers = filteredUsers.filter(
        (user) => user.part.toLowerCase() === part.toLowerCase()
      );
    }

    // 페이지네이션
    const page = parseInt(req.query.page, 10);
    if (!isNaN(page)) {
      const itemsPerPage = 5;
      if (page === 0) {
        // 전체 목록
        res.json(filteredUsers);
      } else {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        res.json(filteredUsers.slice(start, end));
      }
    } else {
      res.json(filteredUsers);
    }
  },
};

module.exports = { output };
