import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnswersList from "../components/AnswersList";
import { useRecoilState } from "recoil";
import quizzesState from "../atoms/quizzesAtom";
import currentQuizState from "../atoms/currentQuizAtom";

const Question = () => {
  const { quizId, questionId } = useParams();
  const [quizzes, setQuizzes] = useRecoilState(quizzesState);
  const [currentQuiz, setCurrentQuiz] = useRecoilState(currentQuizState);
  const currentQuestionIndex = Number(questionId.split("-")[1]) - 1;
  const currentQuestion = currentQuiz.questions_answers[currentQuestionIndex];
  const [answers, setAnswers] = useState(
    currentQuestion.answers.every((answer) => answer.id)
      ? currentQuestion.answers
      : null
  );
  const [currentText, setCurrentText] = useState(currentQuestion.text || "");
  const [feedbackIfTrue, setFeedbackIfTrue] = useState(
    currentQuestion.feedback_true || ""
  );
  const [feedbackIfFalse, setFeedbackIfFalse] = useState(
    currentQuestion.feedback_false || ""
  );
  const [error, setError] = useState();

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

  const saveCurrentQuestion = () => {
    if (answers.length < 2) {
      setError("There should be at least 2 answers");
      return;
    }
    if (!answers.find((answer) => answer.is_true)) {
      setError("At least one answer must be correct");
      return;
    } else {
      setCurrentQuiz((old) => {
        const newCurrentQuestion = {
          ...currentQuestion,
          answers,
          feedback_false: feedbackIfFalse,
          feedback_true: feedbackIfTrue,
          text: currentText,
        };

        const newQuestions = [...old.questions_answers];

        newQuestions.splice(currentQuestionIndex, 1, newCurrentQuestion);

        const newState = {
          ...old,
          created: old.created || new Date(Date.now()).toLocaleString(),
          modified: new Date(Date.now()).toLocaleString(),
          questions_answers: newQuestions,
        };
        localStorage.setItem("currentQuiz", JSON.stringify(newState));
        return newState;
      });
      navigate(`/${quizId}/question-${currentQuestionIndex + 2}`);
    }
  };

  const updateLastQuestion = () => {
    const newCurrentQuestion = {
      ...currentQuestion,
      answers,
      feedback_false: feedbackIfFalse,
      feedback_true: feedbackIfTrue,
      text: currentText,
    };

    const newQuestions = [...currentQuiz.questions_answers];

    newQuestions.splice(currentQuestionIndex, 1, newCurrentQuestion);

    const newState = {
      ...currentQuiz,
      created: currentQuiz.created || new Date(Date.now()).toLocaleString(),
      modified: new Date(Date.now()).toLocaleString(),
      questions_answers: newQuestions,
    };

    return newState;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (answers.length < 2) {
      setError("There should be at least 2 answers");
      return;
    }

    if (currentQuestionIndex === currentQuiz.questions_answers.length) {
      saveCurrentQuestion();
    } else {
      setQuizzes((old) => {
        const quizIndex = quizzes?.findIndex(
          (quiz) => quiz.id === currentQuiz.id
        );
        let newQuizzez = [...old];
        if (quizIndex > -1) {
          newQuizzez[quizIndex] = updateLastQuestion();
        } else {
          newQuizzez.push(updateLastQuestion());
        }
        localStorage.setItem("quizzes", JSON.stringify(newQuizzez));
        return newQuizzez;
      });
    }

    navigate("/");
  };

  useEffect(() => {
    setAnswers(
      currentQuestion.answers.every((answer) => answer.id)
        ? currentQuestion.answers
        : null
    );
    setCurrentText(currentQuestion.text || "");
    setFeedbackIfTrue(currentQuestion.feedback_true || "");
    setFeedbackIfFalse(currentQuestion.feedback_false || "");
  }, [questionId]);

  useEffect(() => {
    setError();
  }, [answers]);

  return (
    <div className="questions">
      <div className="questions-container">
        <form
          id="question-form"
          onSubmit={handleSubmit}
          className="questionsForm"
        >
          <h1>{currentQuiz.title}</h1>
          <div className="questionsDetails">
            <div className="row">
              <label htmlFor="question-text">Question text:</label>
              <textarea
                id="question-text"
                value={currentText}
                onChange={handleSetCurrent}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="feedback-true">Feedback if true:</label>
              <textarea
                id="feedback-true"
                value={feedbackIfTrue}
                onChange={handleFeedbackTrue}
                required
              />
            </div>
            <div className="row">
              <label htmlFor="feedback-false">Feedback if false</label>
              <textarea
                id="feedback-true"
                value={feedbackIfFalse}
                onChange={handleFeedbackFalse}
                required
              />
            </div>
          </div>
        </form>
        <AnswersList answers={answers} setAnswers={setAnswers} />
        {error && <p className="error">{error}</p>}
        <div className="questions-footer">
          {currentQuestionIndex > 0 && (
            <button
              className="link"
              onClick={() =>
                navigate(`/${quizId}/question-${currentQuestionIndex}`)
              }
            >
              Prev
            </button>
          )}
          {currentQuestionIndex < currentQuiz.questions_answers.length - 1 && (
            <button type="submit" className="link" form="question-form">
              Next
            </button>
          )}
          {currentQuestionIndex ===
            currentQuiz.questions_answers.length - 1 && (
            <button type="submit" className="link" form="question-form">
              Save Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Question;
