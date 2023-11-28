import React from "react";

const Answer = ({
  answer,
  setCurrentText,
  setIsCurrentCorrect,
  setItemToEditId,
}) => {
  const { text, id, is_true } = answer;

  const handleEditAnswer = () => {
    setCurrentText(text);
    setIsCurrentCorrect(is_true);
    setItemToEditId(id);
  };

  return (
    <li>
      {text}
      <button type="button" onClick={handleEditAnswer}>
        Edit
      </button>
    </li>
  );
};

export default Answer;
