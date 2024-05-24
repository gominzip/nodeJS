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
      if (page < 0) {
        // 페이지 번호가 유효하지 않은 경우 400
        return res.status(400).json({ error: "Invalid page number" });
      } else if (page === 0) {
        // 전체 목록 반환
        return res.status(200).json(filteredUsers);
      } else {
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        if (start >= filteredUsers.length) {
          // 페이지가 범위를 벗어나는 경우
          return res.status(404).json({ error: "Page not found" });
        }
        return res.status(200).json(filteredUsers.slice(start, end));
      }
    } else {
      // 페이지 번호가 제공되지 않은 경우 전체 목록 반환
      return res.status(200).json(filteredUsers);
    }
  },
};

module.exports = { output };
