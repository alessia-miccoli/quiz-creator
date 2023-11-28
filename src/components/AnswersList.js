import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import { useParams } from "react-router-dom";

const AnswersList = ({ answers, setAnswers }) => {
  const [currentText, setCurrentText] = useState("");
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [itemToEditId, setItemToEditId] = useState(null);
  const [error, setError] = useState();
  const { questionId } = useParams();

  const handleSetCurrent = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSaveAnswer = (e) => {
    e.preventDefault();

    if (error) return;

    if (!itemToEditId) {
      setAnswers((oldAnswers) => [
        ...oldAnswers,
        {
          text: currentText,
          id: itemToEditId || oldAnswers.length + 1,
          is_true: isCurrentCorrect,
        },
      ]);
    } else {
      setAnswers((oldAnswers) => {
        const newAnswers = [...oldAnswers];
        const index = oldAnswers.findIndex(
          (answer) => answer.id === itemToEditId
        );
        newAnswers[index] = {
          text: currentText,
          id: itemToEditId || oldAnswers.length + 1,
          is_true: isCurrentCorrect,
        };

        return newAnswers;
      });
    }

    setCurrentText("");
    setIsCurrentCorrect(false);
    setItemToEditId();
  };

  useEffect(() => {
    if (
      answers &&
      answers.filter((answer) => answer.is_true).length === 1 &&
      isCurrentCorrect
    ) {
      const correctAnswer = answers.find((answer) => answer.is_true).id;
      if (itemToEditId !== correctAnswer)
        setError("There can only be one correct answer.");
    } else {
      setError();
    }
  }, [isCurrentCorrect]);

  return (
    <form
      id="answers-form"
      className="answersContainer"
      onSubmit={handleSaveAnswer}
    >
      <p>Answers:</p>
      {!answers && <div>No answers yet</div>}

      <div className="answersForm">
        <div className="row">
          <label htmlFor="question-text">Description:</label>
          <textarea
            id="question-text"
            value={currentText}
            onChange={handleSetCurrent}
            required
          />
        </div>
        <div className="row">
          <input
            type="radio"
            id="current-correct"
            value="correct"
            onChange={() => setIsCurrentCorrect(true)}
            checked={isCurrentCorrect}
          />
          <label htmlFor="current-correct">Correct</label>
        </div>
        <div className="row">
          <input
            type="radio"
            id="current-incorrect"
            value="incorrect"
            onChange={() => setIsCurrentCorrect(false)}
            checked={!isCurrentCorrect}
          />
          <label htmlFor="current-incorrect">Incorrect</label>
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-container">
          <button
            type="submit"
            form="answers-form"
            className="button"
            disabled={!!error}
          >
            {itemToEditId ? "Save" : "Add"}
          </button>
        </div>
      </div>

      {answers && (
        <ul className="answersList">
          {answers.map((answer) => (
            <Answer
              key={`${questionId}-answer-${answer.id}`}
              answer={answer}
              setCurrentText={setCurrentText}
              setIsCurrentCorrect={setIsCurrentCorrect}
              setItemToEditId={setItemToEditId}
              setAnswers={setAnswers}
            />
          ))}
        </ul>
      )}
    </form>
  );
};

export default AnswersList;
