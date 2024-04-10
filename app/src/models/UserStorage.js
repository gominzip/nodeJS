"use strict";

class UserStorage {
  // static 변수로 만들어주면 인스턴스 없이 클래스 자체로 변수 접근 가능
  static #users = {
    // direct로 외부에서 접근하지 못하도록 #을 이용해 은닉화 (private)
    id: ["test1", "test2", "test3"],
    psword: ["1234", "2345", "3456"],
    name: ["도라에몽", "둥냥이", "삼다수"],
  };

  // 인자로 들어오는 field에 대한 정보만 반환하는 함수
  static getUsers(...fields) {  // 메서드 역시 클래스 자체에서 접근하려면 static 필요
    const users = this.#users;
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

  static getUserInfo(id){
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // users의 모든 키값을 리스트로 저장 => [id, psword, name]
    const userInfo = usersKeys.reduce((newUsers, info)=>{ // 키를 순회하면서 해당 idx에 해당하는 info 저장
      newUsers[info] = users[info][idx];
      return newUsers;
    }, {});
    return userInfo;
  }

  static save(){
    
  }
}

module.exports = UserStorage;
