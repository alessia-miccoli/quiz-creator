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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleSetTitle}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleSetDescription}
          />
        </div>
        <div>
          <label htmlFor="numOfQuestions">Number of questions:</label>
          <input
            id="numOfQuestions"
            type="number"
            value={numOfQuestions}
            onChange={handleSetNumOfQuestions}
          />
        </div>
        <button type="submit">Start</button>
      </form>
    </div>
  );
};

export default NewQuiz;
