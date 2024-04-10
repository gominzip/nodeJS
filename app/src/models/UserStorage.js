"use strict";

const fs = require("fs").promises; // promise 부여

class UserStorage {
  static #getUserInfo(data, id) {
    // private한 변수나 메서드는 항상 맨위에 (컨벤션)
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // users의 모든 키값을 리스트로 저장 => [id, psword, name]
    const userInfo = usersKeys.reduce((newUsers, info) => {
      // 키를 순회하면서 해당 idx에 해당하는 info 저장
      newUsers[info] = users[info][idx];
      return newUsers;
    }, {});

    return userInfo;
  }

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) return users;
    const newUsers = fields.reduce((newUsers, field) => {
      // 인자로 들어온 field값 순회
      if (users.hasOwnProperty(field)) {
        // users에 해당하는 키값이 있는지 확인
        newUsers[field] = users[field]; // newUsers에 키와 value 추가
      }
      return newUsers;
    }, {}); // newUsers의 초기값을 {}로 설정
    return newUsers;
  }

  // 인자로 들어오는 field에 대한 정보만 반환하는 함수
  static getUsers(isAll, ...fields) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUsers(data, isAll, fields);
      })
      .catch(console.error);
  }

  static getUserInfo(id) {
    return fs
      .readFile("./src/databases/users.json")
      .then((data) => {
        return this.#getUserInfo(data, id);
      })
      .catch(console.error);
  }

  static async save(userInfo) {
    const users = await this.getUsers(true); // 모든 데이터 받아오도록
    if (users.id.includes(userInfo.id)) {
      throw "이미 존재하는 아이디입니다.";
    }
    users.id.push(userInfo.id);
    users.name.push(userInfo.name);
    users.psword.push(userInfo.psword);
    fs.writeFile("./src/databases/users.json", JSON.stringify(users));
    return { success: true };
  }
}

module.exports = UserStorage;
