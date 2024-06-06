import React from "react";
import Answer from "./Answer";
import "./Category.css";

const Category = ({ title, questions }) => {
  return (
    <section className="category-con">
      <h2 className="category-title">{title}</h2>
      <div className="questions-con">
        {questions.map((question) => (
          <Answer key={question.text} text={question.text} answers={question.answers} />
        ))}
      </div>
    </section>
  );
};

export default Category;
