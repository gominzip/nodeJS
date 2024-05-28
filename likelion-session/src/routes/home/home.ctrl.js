"use strict";

const lions = require("../../databases/lions.json");
const questions = require("../../databases/testlist.json");

const process = {
  lionlist: (req, res) => {
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

  // GET /liontest/question
  testlist: (req, res) => {
    const questionsWithoutAnswers = questions.questions.map((quiz) => {
      const { answer, ...questionWithoutAnswer } = quiz;
      return questionWithoutAnswer;
    });

    res.status(200).json({ questions: questionsWithoutAnswers });
  },

  // POST /liontest/result
  testresult: (req, res) => {
    const userAnswers = req.body.answers;

    if (!Array.isArray(userAnswers)) {
      return res.status(400).json({ error: "Invalid input format" });
    }

    let correctCount = 0;
    const incorrectQuestions = [];
    const result = {resultImg:'', resultTitle:''}

    questions.questions.forEach((question, index) => {
      if (userAnswers[index] === question.answer) {
        correctCount++;
      } else {
        incorrectQuestions.push({
          question: question.question,
          answer: question.choices[question.answer -1],
        });
      }
    });

    if (correctCount === 5){
      result.resultImg = 'https://gominzipsession.o-r.kr/images/result3.png'
      result.resultTitle = '👑 당신은 진정한 백수의 왕 🦁'
    }else if (correctCount >= 3){
      result.resultImg = 'https://gominzipsession.o-r.kr/images/result2.png'
      result.resultTitle = '거의 다 맞추고 완전 럭키비키잖아~😊🍀'
    }else if (correctCount >= 1){
      result.resultImg = 'https://gominzipsession.o-r.kr/images/result1.png'
      result.resultTitle = '아직 응애사자 🐱'
    }else{
      result.resultImg = 'https://gominzipsession.o-r.kr/images/result0.png'
      result.resultTitle = '🌭 소세지0점 -_-;'
    }

    return res.status(200).json({
      result: result,
      correctCount: correctCount,
      incorrectQuestions: incorrectQuestions,
    });
  },
};

module.exports = { process };