import React from 'react';
import { useParams } from 'react-router-dom';

const Answers = () => {
  let { quizId, answerId } = useParams();

  return (
    <div>
      {quizId} - {answerId}
    </div>
  );
}

export default Answers;
