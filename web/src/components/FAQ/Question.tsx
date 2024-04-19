import React, { useState } from "react";
import "./Question.css";

const Question = ({ text }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <article>
      <div className="question" onClick={() => setIsOpen(!isOpen)}>{text}</div>
      {isOpen && <p>// Answer content goes here...</p>}
    </article>
  );
};

export default Question;
