import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnswersList from "../components/AnswersList";

const Questions = () => {
  let { quizId, questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const [currentText, setCurrentText] = useState("");
  const [feedbackIfTrue, setFeedbackIfTrue] = useState("");
  const [feedbackIfFalse, setFeedbackIfFalse] = useState("");
  const currentQuestion = Number(questionId.split("-")[1]);
  const navigate = useNavigate();

  const handleSetCurrent = (e) => {
    setCurrentText(e.target.value);
  };

  const handleFeedbackTrue = (e) => {
    setFeedbackIfTrue(e.target.value);
  };

  const handleFeedbackFalse = (e) => {
    setFeedbackIfFalse(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //save quiz

    navigate("/");
  };

  return (
    <div className="questions">
      <form onSubmit={handleSubmit} className="questionsForm">
        <div className="questionsDetails">
          <div className="row">
            <label htmlFor="question-text">Question text:</label>
            <textarea
              id="question-text"
              value={currentText}
              onChange={handleSetCurrent}
            />
          </div>
          <div className="row">
            <label htmlFor="feedback-true">Feedback if true:</label>
            <textarea
              id="feedback-true"
              value={feedbackIfTrue}
              onChange={handleFeedbackTrue}
            />
          </div>
          <div className="row">
            <label htmlFor="feedback-false">Feedback if false</label>
            <textarea
              id="feedback-true"
              value={feedbackIfFalse}
              onChange={handleFeedbackFalse}
            />
          </div>
          <AnswersList answers={answers} setAnswers={setAnswers} />
        </div>
        <div className="questions-footer">
          {currentQuestion > 0 && (
            <Link to={`/${quizId}/question-${currentQuestion - 1}`}>Back</Link>
          )}
          {currentQuestion < 5 && (
            <Link to={`/${quizId}/question-${currentQuestion + 1}`}>Next</Link>
          )}
          {currentQuestion === 5 && <button type="submit">Save Quiz</button>}
        </div>
      </form>
    </div>
  );
};

export default Questions;
