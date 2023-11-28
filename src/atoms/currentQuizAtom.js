import { atom } from "recoil";

let currentQuiz;
if (!localStorage.getItem("currentQuiz")) {
  localStorage.setItem("currentQuiz", "{}");
} else {
  currentQuiz = JSON.parse(localStorage.getItem("currentQuiz"));
}

const currentQuizState = atom({
  key: "currentQuiz",
  default: currentQuiz,
});

export default currentQuizState;
