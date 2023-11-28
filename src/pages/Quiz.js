import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useRecoilValue, useRecoilState } from "recoil";
import quizzesState from "../atoms/quizzesAtom";
import currentQuizState from "../atoms/currentQuizAtom";

// TODO: error check

const Quiz = () => {
  const quizzes = useRecoilValue(quizzesState);
  const { quizId } = useParams();
  const quiz_id = Number(quizId.split("-")[1]);
  const quiz = quizzes.find((quiz) => quiz.id === quiz_id);
  const [currentQuiz, setCurrentQuiz] = useRecoilState(currentQuizState);
  const [numOfQuestions, setNumOfQuestions] = useState(5);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
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
    localStorage.setItem("currentQuiz", JSON.stringify(createCurrentState()));
    navigate(`question-1`);
  };

  useEffect(() => {
    setCurrentQuiz(createCurrentState());
  }, [quizId]);

  useEffect(() => {
    setTitle(currentQuiz?.title || "");
    setDescription(currentQuiz?.description || "");
    setNumOfQuestions(currentQuiz?.questions_answers.length || 5);
  }, [currentQuiz]);

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
            {quiz ? "Edit" : "Start"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Quiz;
