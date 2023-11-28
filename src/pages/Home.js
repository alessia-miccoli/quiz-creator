import React from "react";
import { Link, useNavigate } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useRecoilValue, useSetRecoilState } from "recoil";
import quizzesState from "../atoms/quizzesAtom";
import currentQuizState from "../atoms/currentQuizAtom";

const Home = () => {
  const quizzes = useRecoilValue(quizzesState);
  const setCurrentQuiz = useSetRecoilState(currentQuizState);
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <button
        className="button"
        onClick={() => {
          setCurrentQuiz({});
          localStorage.setItem("currentQuiz", "{}");
          navigate(`/quiz-creator/quiz-${quizzes?.length + 1 || 1}`);
        }}
      >
        Create New Quiz
      </button>
      <div className="quiz-container">
        {quizzes?.length ? (
          <>
            {quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quizInfo={quiz} />
            ))}
          </>
        ) : (
          <div className="no-quiz">No quiz created yet</div>
        )}
      </div>
    </div>
  );
};

export default Home;
