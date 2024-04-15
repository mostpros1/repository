import React from "react";
import Category from "./Category";
import faqpic from "../../assets/FAQ.svg";
import "./FAQ.css";

const faqData = [
  {
    title: "Over Mostpros",
    questions: [
      "Wat is Mostpros?",
      "Waarom Mostpros?",
      // ... other questions
    ],
  },
  {
    title: "Tarieven en facturatie",
    questions: [
      "Is Mostpros gratis om te gebruiken?",
      "Kan ik korting krijgen?",
      // ... other questions
    ],
  },
  {
    title: "Ratings en Reviews",
    questions: [
      "Hoe weet ik of de reviews op Mostpros betrouwbaar zijn?",
      "Kan ik een review anoniem plaatsen?",
      "Kan ik een review plaatsen zonder een account te hebben?",
      "Wat zijn de review en ratings richtlijnen?",
      // ... add more questions as needed
    ],
  },
  {
    title: "Pro-certificering en screening",
    questions: [
      "Hoe worden vakspecialisten op Mostpros Certified?",
      "Hoe vaak wordt er een achtergrond controle gedaan?",
      // ... add more questions as needed
    ],
  },
];

const FAQ = () => {
  return (
    <div className="faq-grid">
      <div className="faq-header">
        <p>Veel gestelde vragen</p>
        <img src={faqpic} alt="faq" />
      </div>
      {faqData.map((category) => (
        <Category key={category.title} {...category} />
      ))}
    </div>
  );
};

export default FAQ;
