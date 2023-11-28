import React from "react";
import { Link } from "react-router-dom";
import QuizCard from "../components/QuizCard";
import { useRecoilValue } from "recoil";
import quizzesState from "../atoms/quizzesAtom";

const Home = () => {
  const quizzes = useRecoilValue(quizzesState);

  return (
    <div className="homepage">
      <Link className="button" to={`/quiz-${quizzes?.length + 1}`}>
        Create New Quiz
      </Link>
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
