import React from "react";
import Category from "./Category";

import "./FAQ.css";

const faqData = [
  {
    title: "Over Mostpros",
    questions: [
      "Wat is Mostpros?",
      "Waarom Mostpros?",
      "Hoe werkt Mostpros?",
      "Hoe maak ik een account aan als vakspecialist?",
      "Hoe maak een account aan?",
    ],
  },
  {
    title: "Tarieven en facturatie",
    questions: [
      "Is Mostpros gratis om te gebruiken?",
      "Kan ik korting krijgen?",
      "Hoe weet ik of ik een eerlijk bedrag krijg?",
    ],
  },
  {
    title: "Ratings en Reviews",
    questions: [
      "Hoe weet ik of de reviews op Mostpros betrouwbaar zijn?",
      "Kan ik een review anoniem plaatsen?",
      "Kan ik een review plaatsen zonder een account te hebben?",
      "Wat zijn de review en ratings richtlijnen?",
    ],
  },
  {
    title: "Pro-certificering en screening",
    questions: [
      "Hoe worden vakspecialisten op Mostpros Certified?",
      "Ondergaat elke vakspecialist een achtergrond controle?",
      "Hoe vaak wordt er een achtergrond controle gedaan?",
      "Hoe kan ik een zorg over een vakspecialist in de Mostpros-netwerk melden?",
      "Kan ik er zeker van zijn dat elke vakspecialist die bij mij thuis komt, Mostpros zijn achtergrond controle heeft doorlopen?",
      "Wat gebeurt er als een bedrijf/vakspecialist niet slaagt voor een achtergrond controle?",
    ],
  },
  {
    title: "Projectondersteuning",
    questions: [
      "Hoe worden vakspecialisten op Mostpros Certified?",
      "Hoe vaak wordt er een achtergrond controle gedaan?",
      "Wat als er iets misgaat met mijn klus?",
      "Hoe neem ik contact op met het MostPros-ondersteuningsteam?",
    ],
  },
  {
    title: "Beveiliging en accountbeheer",
    questions: [
      "Hoe wijzig ik mijn wachtwoord?",
      "Hoe vaak wordt er een achtergrond controle gedaan?",
      "Hoe weet ik of de Mostpros-site veilig is?",
      "Hoe kan ik mijn account verwijderen?",
      "Verkoopt of deelt Mostpros mijn persoonlijke gegevens?",
      "Hoe kan ik mij afmelden voor e-mails van Mostpros?",
    ],
  },
];

const FAQ = () => {
  return (
    <>
      <div className="sect-header">
        {faqData.map((category) => (
          <Category title={category.title} questions={category.questions} />
        ))}
      </div>
    </>
  );
};

export default FAQ;
