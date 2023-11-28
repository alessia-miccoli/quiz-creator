import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import quizzesState from "../atoms/quizzesAtom";
import currentQuizState from "../atoms/currentQuizAtom";

// TODO: error check

const Quiz = () => {
  const quizzes = useRecoilValue(quizzesState);
  const { quizId } = useParams();
  const quiz_id = Number(quizId.split("-")[1]);
  const quiz = quizzes.find((quiz) => quiz.id === quiz_id);
  const [numOfQuestions, setNumOfQuestions] = useState(
    quiz?.questions_answers.length || 5
  );
  const [title, setTitle] = useState(quiz?.title || "");
  const [description, setDescription] = useState(quiz?.description || "");
  const currentNumOfQuiz = useRecoilValue(quizzesState).length;

  const createCurrentState = () => {
    if (quiz) return quiz;

    const questions_answers = Array.apply(
      null,
      Array(Number(numOfQuestions))
    ).map((_, index) => ({
      answer_id: index,
      answers: [],
    }));

    const newQuiz = {
      description,
      id: currentNumOfQuiz + 1,
      questions_answers,
      score: null,
      title,
      url: "https://www.youtube.com/watch?v=e6EGQFJLl04",
    };

    return newQuiz;
  };
  const setCurrentQuiz = useSetRecoilState(currentQuizState);
  const navigate = useNavigate();

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
    setCurrentQuiz(createCurrentState());
    navigate(`question-1`);
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

export default Quiz;
