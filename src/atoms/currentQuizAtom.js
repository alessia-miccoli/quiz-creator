import { atom } from "recoil";

const currentQuizState = atom({
  key: "currentQuiz",
  default: {},
});

export default currentQuizState;
