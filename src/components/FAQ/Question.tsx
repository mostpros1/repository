import React, { useState } from "react";
import "./Question.css";

const Question = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article id="question-var">
      <div className="question" onClick={() => setIsOpen(!isOpen)}>{text}</div>
      {isOpen && <p>Je moet contact opnemen met klantenservice</p>}
    </article>
  );
};

export default Question;
