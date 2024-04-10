"use strict";

const id = document.querySelector("#id"),
  psword = document.querySelector("#psword"),
  loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);

function login() {
  const req = {
    id: id.value,
    psword: psword.value,
  };

  fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json()) // Promise 반환
    .then((res)=>{   // then으로 Promise 접근
        if (res.success){
            location.href = "/";
        }else{
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.err("로그인 중 에러 발생")
    })
}
