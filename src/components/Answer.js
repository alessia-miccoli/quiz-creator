import React from "react";

const Answer = ({
  answer,
  setCurrentText,
  setIsCurrentCorrect,
  setItemToEditId,
  setAnswers,
}) => {
  const { text, id, is_true } = answer;

  const handleEditAnswer = () => {
    setCurrentText(text);
    setIsCurrentCorrect(is_true);
    setItemToEditId(id);
  };

  const handleRemove = () => {
    setAnswers((old) => {
      const newAnswers = [...old];
      newAnswers.splice(
        old.findIndex((answer) => answer.id === id),
        1
      );
      return newAnswers;
    });
  };

  return (
    <li>
      <span>{text}</span>
      <div className="buttonsContainer">
        <button
          type="button"
          className="button-small"
          onClick={handleEditAnswer}
        >
          Edit
        </button>
        <button type="button" className="button-small" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </li>
  );
};

export default Answer;
