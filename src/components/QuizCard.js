import React from "react";

const QuizCard = ({ quizInfo }) => {
  const { title, description, url } = quizInfo;

  return (
    <div>
      <header>{title}</header>
      <p>{description}</p>
      <footer>
        <a href={url} target="_blank" rel="noreferrer">
          Take quiz
        </a>
      </footer>
    </div>
  );
};

export default QuizCard;
