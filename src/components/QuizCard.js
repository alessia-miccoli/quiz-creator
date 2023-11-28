import React from "react";
import { useNavigate } from "react-router-dom";

const QuizCard = ({ quizInfo }) => {
  const { title, description, url, id } = quizInfo;
  const navigate = useNavigate();

  return (
    <div
      className="quiz-card"
      onClick={() => {
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
