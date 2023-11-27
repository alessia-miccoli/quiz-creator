import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

const Questions = () => {
  let { quizId, questionId } = useParams();
  const [answers, setAnswers] = useState([]);
  const currentQuestion = Number(questionId.split("-")[1]);
  const navigate = useNavigate();

  return (
    <div>
      <QuestionCard answers={answers} setAnswers={setAnswers} />
      {currentQuestion > 0 && (
        <Link to={`/${quizId}/question-${currentQuestion - 1}`}>Back</Link>
      )}
      {currentQuestion < 5 && (
        <Link to={`/${quizId}/question-${currentQuestion + 1}`}>Next</Link>
      )}
      {currentQuestion === 5 && (
        <button onClick={() => navigate("/")}>Save Quiz</button>
      )}
    </div>
  );
};

export default Questions;
