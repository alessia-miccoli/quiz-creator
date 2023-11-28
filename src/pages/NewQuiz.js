import React, { useState } from "react";
import { useNavigate } from "react-router";

const NewQuiz = () => {
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const currentNumOfQuiz = 3;

  const handleSetNumOfQuestions = (e) => {
    setNumOfQuestions(e.target.value);
  };

  const handleSetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleSetDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/quiz-${currentNumOfQuiz + 1}/question-0`);
  };

  return (
    <div className="newQuiz">
      <form onSubmit={handleSubmit} className="newQuizForm">
        <div className="row">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleSetTitle}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleSetDescription}
          />
        </div>
        <div className="row">
          <label htmlFor="numOfQuestions">Number of questions:</label>
          <input
            id="numOfQuestions"
            type="number"
            value={numOfQuestions}
            onChange={handleSetNumOfQuestions}
          />
        </div>
        <div className="button-container">
          <button className="button" type="submit">
            Start
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewQuiz;
