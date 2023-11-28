import React from "react";
import { useNavigate } from "react-router-dom";
import currentQuizState from "../atoms/currentQuizAtom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import quizzesState from "../atoms/quizzesAtom";

const QuizCard = ({ quizInfo }) => {
  const { title, description, url, id } = quizInfo;
  const setCurrentQuiz = useSetRecoilState(currentQuizState);
  const navigate = useNavigate();
  const quizzes = useRecoilValue(quizzesState);
  const quiz = quizzes?.find((quiz) => quiz.id === id);

  return (
    <div
      className="quiz-card"
      onClick={() => {
        localStorage.setItem("currentQuiz", JSON.stringify(quiz));
        setCurrentQuiz(quiz);
        navigate(`quiz-${id}`);
      }}
    >
      <header className="quiz-header">{title}</header>
      <p className="quiz-description">{description}</p>
      <footer className="quiz-footer">
        <a
          className="link"
          href={url}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
        >
          Quiz URL
        </a>
      </footer>
    </div>
  );
};

export default QuizCard;
