import React, { useState } from "react";
import "./Answer.css";

const Answer = ({ text, answers }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article id="answer-var">
      <div className="answer" onClick={() => setIsOpen(!isOpen)}>{text}</div>
      {isOpen && (
        <div className="answers">
          {answers.map((answer, index) => (
            <p key={index}>{answer}</p>
          ))}
        </div>
      )}
    </article>
  );
};

export default Answer;
