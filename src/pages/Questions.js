import React from "react";
import { useParams } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

const Questions = () => {
  let { quizId, questionId } = useParams();

  return (
    <div>
      {quizId} - {questionId}
      <QuestionCard />
    </div>
  );
};

export default Questions;
