import React, { useState } from 'react';
import "./IdealOptionsComp.css";
import ideal from "../../assets/ideal.png";
import abn from "../../assets/abnamro.png";
import ing from "../../assets/ing.png";
import asn from "../../assets/asn.png";
import bunq from "../../assets/bunq.png";
import moneyou from "../../assets/moneyou.png";
import handelsbank from "../../assets/handelsbank.png";
import regiobank from "../../assets/regiobank.png";
import triodos from "../../assets/triodos.png";
import snsbank from "../../assets/snsbank.png";
import rabobank from "../../assets/rabobank.jpg";
import knab from "../../assets/knab.png";
import vanlanschot from "../../assets/vanlanschot.png";

function IdealOptionsComp() {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  return (
    <main id="mainmain">
      <section id="InvoiceCompSection">
        <section id="topButtonContainer">
          <a id="topButton" href="" rel="noopener noreferrer">
            Terug naar resultaten
          </a>
          <div className="progressContainer">
            <h5 className="InvoiceCompProgressTitle">Factuur</h5>
            <div className="progressBar">
              <div className="progressBlock filled"></div>
              <div className="progressBlock filled"></div>
              <div className="progressBlock filled"></div>
              <div className="progressBlock"></div>
              <div className="progressBlock"></div>
            </div>
          </div>
        </section>
      </section>
      <article className="paymentBigCard">
        <h3>Selecteer een betaalwijze</h3>
        <section className="paymentOptionsCardsWrapperOne">
          <article className={`paymentOptionsCard ${selectedCard === 0 ? 'selected' : ''}`} onClick={() => handleCardClick(0)}>
            <img className="paymentOptionsImage" src={ideal} alt="" />
          </article>
        </section>
      </article>
      <article className="paymentBigCard">
        <section className="paymentOptionsCardsWrapper">
          <article className={`paymentOptionsCard ${selectedCard === 1 ? 'selected' : ''}`} onClick={() => handleCardClick(1)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 2 ? 'selected' : ''}`} onClick={() => handleCardClick(2)}>
            <img className="paymentOptionsImage" src={ing} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 3 ? 'selected' : ''}`} onClick={() => handleCardClick(3)}>
            <img className="paymentOptionsImage" src={asn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={bunq} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 5 ? 'selected' : ''}`} onClick={() => handleCardClick(5)}>
            <img className="paymentOptionsImage" src={rabobank} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 6 ? 'selected' : ''}`} onClick={() => handleCardClick(6)}>
            <img className="paymentOptionsImage" src={snsbank} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 7 ? 'selected' : ''}`} onClick={() => handleCardClick(7)}>
            <img className="paymentOptionsImage" src={regiobank} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 8 ? 'selected' : ''}`} onClick={() => handleCardClick(8)}>
            <img className="paymentOptionsImage" src={knab} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 9 ? 'selected' : ''}`} onClick={() => handleCardClick(9)}>
            <img className="paymentOptionsImage" src={triodos} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 10 ? 'selected' : ''}`} onClick={() => handleCardClick(10)}>
            <img className="paymentOptionsImage" src={handelsbank} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 11 ? 'selected' : ''}`} onClick={() => handleCardClick(11)}>
            <img className="paymentOptionsImage" src={moneyou} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 12 ? 'selected' : ''}`} onClick={() => handleCardClick(12)}>
            <img className="paymentOptionsImage" src={vanlanschot} alt="" />
          </article>
        </section>
      </article>
      <section className="invoiceButtonContainer">
         <button className={`PaymentOptionsButtonOne ${selectedCard !== null ? 'blueButton' : ''}`}>Vorige</button>
          <button className={`PaymentOptionsButtonTwo ${selectedCard !== null ? 'redButton' : ''}`}>Volgende</button>
        </section>
    </main>
  );
}

export default IdealOptionsComp;
