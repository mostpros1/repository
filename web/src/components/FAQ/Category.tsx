import React from "react";
import Question from "./Question";
import "./Category.css";

const Category = ({ title, questions }) => {
  return (
    <section>
      <h2 className="category-title">{title}</h2>
      <div className="questions-con">
        {questions.map((questionText) => (
          <Question key={questionText} text={questionText} />
        ))}
      </div>
    </section>
  );
};

export default Category;
