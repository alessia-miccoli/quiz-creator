import { atom } from "recoil";

let quizzes;
if (!localStorage.getItem("quizzes")) {
  localStorage.setItem("quizzes", "[]");
} else {
  quizzes = JSON.parse(localStorage.getItem("quizzes"));
}

const quizzesState = atom({
  key: "quizzes",
  default: quizzes,
});

export default quizzesState;
