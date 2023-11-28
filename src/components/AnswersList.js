import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import { useParams } from "react-router-dom";

const AnswersList = ({ answers, setAnswers }) => {
  const [currentText, setCurrentText] = useState("");
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [itemToEditId, setItemToEditId] = useState(null);
  const [error, setError] = useState();
  const { questionId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSetCurrent = (e) => {
    setCurrentText(e.target.value);
  };

  const handleSaveAnswer = () => {
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
        newAnswers[itemToEditId - 1] = {
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
      answers.filter((answer) => answer.is_true).length === 1 &&
      isCurrentCorrect
    ) {
      const correctAnswer = answers.find((answer) => answer.is_true).id;
      if (itemToEditId !== correctAnswer)
        setError("There can only be one correct answer.");
    } else setError();
  }, [isCurrentCorrect]);

  return (
    <div className="answersContainer">
      {!answers.length && <div>No answers yet</div>}

      <div className="answersForm">
        <div className="row">
          <label htmlFor="question-text">Description:</label>
          <textarea
            id="question-text"
            value={currentText}
            onChange={handleSetCurrent}
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
        {error && <p>{error}</p>}
        <div className="button-container">
          <button
            className="button"
            type="button"
            onClick={handleSaveAnswer}
            disabled={!!error}
          >
            {itemToEditId ? "Save" : "Add"}
          </button>
        </div>
      </div>

      {answers.length > 0 && (
        <ul className="answersList">
          {answers.map((answer) => (
            <Answer
              key={`${questionId}-answer-${answer.id}`}
              answer={answer}
              setCurrentText={setCurrentText}
              setIsCurrentCorrect={setIsCurrentCorrect}
              setItemToEditId={setItemToEditId}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default AnswersList;
