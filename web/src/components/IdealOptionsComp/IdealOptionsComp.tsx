import React, { useState } from 'react';
import "./IdealOptionsComp.css";
import ideal from "../../assets/ideal.png";
import abn from "../../assets/abnamro.png";
import ing from "../../assets/ing.png";
import asn from "../../assets/asn.png";
import bunq from "../../assets/bunq.png";

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
          <article className={`paymentOptionsCard ${selectedCard === 0 ? 'selected' : ''}`} onClick={() => handleCardClick(0)}>
            <img className="paymentOptionsImage" src={ideal} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 1 ? 'selected' : ''}`} onClick={() => handleCardClick(1)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 2 ? 'selected' : ''}`} onClick={() => handleCardClick(2)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 3 ? 'selected' : ''}`} onClick={() => handleCardClick(3)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={abn} alt="" />
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
