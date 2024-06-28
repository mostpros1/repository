import React from "react";
import faqpic from "../../assets/FAQ.svg";
import Category from "./Category";
import "./FAQ.css";

// const faqData = [
//   {
//     title: "Over Mostpros",
//     questions: [
//       {
//         text: "Wat is Mostpros?",
//         answers: [
//           "Mostpros is een alles-in-één platform waar huiseigenaren met vakspecialisten in contact met elkaar kunnen komen. Mostpros maakt het voor huiseigenaren eenvoudiger om betrouwbare professionals te vinden voor een breed scala aan taken, van kleine reparaties tot grote renovaties.",
//           "Voor specialisten biedt Mostpros een platform om hun diensten te promoten, zichtbaarheid te vergroten en contact te leggen met potentiële klanten. Of u nu een klus wilt laten klaren of een professional bent die op zoek is naar nieuwe kansen, Mostpros biedt een gebruiksvriendelijke en efficiënte omgeving voor alle diensten die met uw huis te maken hebben.",
//         ],
//       },
//       {
//         text: "Waarom Mostpros?",
//         answers: [
//           "Mostpros biedt betrouwbare en gecertificeerde professionals.",
//           "Het zorgt voor een naadloos boekings- en betalingsproces."
//         ],
//       },
//       {
//         text: "Hoe werkt Mostpros?",
//         answers: [
//           "Gebruikers kunnen een account aanmaken en hun behoeften aangeven.",
//           "Professionals kunnen reageren op verzoeken en projecten aannemen."
//         ],
//       },
//       {
//         text: "Hoe maak ik een account aan als vakspecialist?",
//         answers: [
//           "Klik op 'Registreren' en kies voor de optie 'Vakspecialist'.",
//           "Vul je gegevens in en voltooi het registratieproces."
//         ],
//       },
//       {
//         text: "Hoe maak een account aan?",
//         answers: [
//           "Klik op 'Registreren' op de homepage.",
//           "Vul je persoonlijke gegevens in en bevestig je e-mailadres."
//         ],
//       },
//     ],
//   },
//   {
//     title: "Tarieven en facturatie",
//     questions: [
//       {
//         text: "Is Mostpros gratis om te gebruiken?",
//         answers: [
//           "Ja, Mostpros is gratis voor klanten.",
//           "Professionals kunnen een abonnementstarief hebben."
//         ],
//       },
//       {
//         text: "Kan ik korting krijgen?",
//         answers: [
//           "Soms zijn er promoties en kortingen beschikbaar.",
//           "Neem contact op met de klantenservice voor actuele aanbiedingen."
//         ],
//       },
//       {
//         text: "Hoe weet ik of ik een eerlijk bedrag krijg?",
//         answers: [
//           "Mostpros zorgt voor transparante prijzen.",
//           "Je kunt reviews en beoordelingen van andere klanten bekijken."
//         ],
//       },
//     ],
//   },
//   {
//     title: "Ratings en Reviews",
//     questions: [
//       {
//         text: "Hoe weet ik of de reviews op Mostpros betrouwbaar zijn?",
//         answers: [
//           "Mostpros controleert alle reviews handmatig.",
//           "Alleen klanten die de dienst hebben gebruikt, kunnen een review plaatsen."
//         ],
//       },
//       {
//         text: "Kan ik een review anoniem plaatsen?",
//         answers: [
//           "Ja, je kunt ervoor kiezen om anoniem een review te plaatsen.",
//           "Je gegevens blijven vertrouwelijk en worden niet gedeeld."
//         ],
//       },
//       {
//         text: "Kan ik een review plaatsen zonder een account te hebben?",
//         answers: [
//           "Nee, je moet een account hebben om een review te kunnen plaatsen.",
//           "Dit zorgt voor authenticiteit en betrouwbaarheid van de reviews."
//         ],
//       },
//       {
//         text: "Wat zijn de review en ratings richtlijnen?",
//         answers: [
//           "Reviews moeten eerlijk en respectvol zijn.",
//           "Geen beledigende taal of persoonlijke aanvallen zijn toegestaan."
//         ],
//       },
//     ],
//   },
//   {
//     title: "Pro-certificering en screening",
//     questions: [
//       {
//         text: "Hoe worden vakspecialisten op Mostpros Certified?",
//         answers: [
//           "Professionals moeten een strenge certificeringsprocedure doorlopen.",
//           "Ze moeten voldoen aan bepaalde kwalificaties en criteria."
//         ],
//       },
//       {
//         text: "Ondergaat elke vakspecialist een achtergrond controle?",
//         answers: [
//           "Ja, elke specialist ondergaat een achtergrond controle.",
//           "Dit zorgt voor de veiligheid en betrouwbaarheid van de diensten."
//         ],
//       },
//       {
//         text: "Hoe vaak wordt er een achtergrond controle gedaan?",
//         answers: [
//           "Achtergrond controles worden jaarlijks uitgevoerd.",
//           "Bij bepaalde incidenten kan een extra controle nodig zijn."
//         ],
//       },
//       {
//         text: "Hoe kan ik een zorg over een vakspecialist in de Mostpros-netwerk melden?",
//         answers: [
//           "Je kunt een klacht indienen via het contactformulier op de website.",
//           "Ons ondersteuningsteam neemt dan zo snel mogelijk contact met je op."
//         ],
//       },
//       {
//         text: "Kan ik er zeker van zijn dat elke vakspecialist die bij mij thuis komt, Mostpros zijn achtergrond controle heeft doorlopen?",
//         answers: [
//           "Ja, alle vakspecialisten moeten slagen voor een achtergrond controle.",
//           "Je kunt de certificering en beoordelingen van de specialist op hun profiel zien."
//         ],
//       },
//       {
//         text: "Wat gebeurt er als een bedrijf/vakspecialist niet slaagt voor een achtergrond controle?",
//         answers: [
//           "Ze worden niet toegelaten tot het Mostpros-netwerk.",
//           "Klanten worden geïnformeerd en een vervangende specialist wordt toegewezen."
//         ],
//       },
//     ],
//   },
//   {
//     title: "Projectondersteuning",
//     questions: [
//       {
//         text: "Hoe worden vakspecialisten op Mostpros Certified?",
//         answers: [
//           "Professionals moeten een strenge certificeringsprocedure doorlopen.",
//           "Ze moeten voldoen aan bepaalde kwalificaties en criteria."
//         ],
//       },
//       {
//         text: "Hoe vaak wordt er een achtergrond controle gedaan?",
//         answers: [
//           "Achtergrond controles worden jaarlijks uitgevoerd.",
//           "Bij bepaalde incidenten kan een extra controle nodig zijn."
//         ],
//       },
//       {
//         text: "Wat als er iets misgaat met mijn klus?",
//         answers: [
//           "Neem direct contact op met ons ondersteuningsteam.",
//           "We zullen samenwerken om een oplossing te vinden."
//         ],
//       },
//       {
//         text: "Hoe neem ik contact op met het MostPros-ondersteuningsteam?",
//         answers: [
//           "Je kunt ons bereiken via het contactformulier op de website.",
//           "Telefonisch zijn we bereikbaar op het nummer dat vermeld staat op de contactpagina."
//         ],
//       },
//     ],
//   },
//   {
//     title: "Beveiliging en accountbeheer",
//     questions: [
//       {
//         text: "Hoe wijzig ik mijn wachtwoord?",
//         answers: [
//           "Ga naar je accountinstellingen en selecteer 'Wachtwoord wijzigen'.",
//           "Volg de instructies om je wachtwoord te resetten."
//         ],
//       },
//       {
//         text: "Hoe vaak wordt er een achtergrond controle gedaan?",
//         answers: [
//           "Achtergrond controles worden jaarlijks uitgevoerd.",
//           "Bij bepaalde incidenten kan een extra controle nodig zijn."
//         ],
//       },
//       {
//         text: "Hoe weet ik of de Mostpros-site veilig is?",
//         answers: [
//           "Mostpros maakt gebruik van SSL-encryptie om je gegevens te beschermen.",
//           "We volgen de beste praktijken op het gebied van cyberbeveiliging."
//         ],
//       },
//       {
//         text: "Hoe kan ik mijn account verwijderen?",
//         answers: [
//           "Neem contact op met de klantenservice om je account te verwijderen.",
//           "Je ontvangt een bevestiging zodra je account is verwijderd."
//         ],
//       },
//       {
//         text: "Verkoopt of deelt Mostpros mijn persoonlijke gegevens?",
//         answers: [
//           "Nee, Mostpros verkoopt of deelt je persoonlijke gegevens niet zonder jouw toestemming.",
//           "We nemen je privacy zeer serieus en beschermen je informatie."
//         ],
//       },
//       {
//         text: "Hoe kan ik mij afmelden voor e-mails van Mostpros?",
//         answers: [
//           "Klik op de afmeldlink onderaan de e-mail.",
//           "Je kunt ook je e-mailvoorkeuren aanpassen in je accountinstellingen."
//         ],
//       },
//     ],
//   },
// ];


const FAQ = () => {
  return (
    <>
      <div className="faq-header">
        <img className="faq-headerIMG" src={faqpic} alt="faq" />
        <p>Veel gestelde vragen</p>
      </div>
      <div className="sect-header">
        {/* {faqData.map((category) => (
          <Category title={category.title} questions={category.questions} />
        ))} */}
        <h1>Wat is Mostpros?</h1>
        <h3>Mostpros is een alles-in-één platform waar huiseigenaren met vakspecialisten in contact met elkaar kunnen komen. Mostpros maakt het voor huiseigenaren eenvoudiger om betrouwbare professionals te vinden voor een breed scala aan taken, van kleine reparaties tot grote renovaties.</h3>
        <br></br>
        <h3>Voor specialisten biedt Mostpros een platform om hun diensten te promoten, zichtbaarheid te vergroten en contact te leggen met potentiële klanten. Of u nu een klus wilt laten klaren of een professional bent die op zoek is naar nieuwe kansen, Mostpros biedt een gebruiksvriendelijke en efficiënte omgeving voor alle diensten die met uw huis te maken hebben.
        </h3>
      </div>
    </>
  );
};

export default FAQ;
