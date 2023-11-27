import React from "react";

const Answer = ({
  answer,
  setNewAnswerVisible,
  setCurrentText,
  setIsCurrentCorrect,
  setItemToEditId,
}) => {
  const { text, id, is_true } = answer;

  const handleEditAnswer = () => {
    setCurrentText(text);
    setIsCurrentCorrect(is_true);
    setItemToEditId(id);
    setNewAnswerVisible(true);
  };

  return (
    <li>
      {text} <button onClick={handleEditAnswer}>Edit</button>
    </li>
  );
};

export default Answer;
