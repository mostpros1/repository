import React, { useState } from 'react';
import "./PaymentOptionsComp.css";
import ideal from "../../assets/ideal.png";
import creditcard from "../../assets/creditcard.png";
import paypal from "../../assets/paypal.png";
import klarna from "../../assets/klarna.png";
import googlepay from "../../assets/googlepay.png";

function PaymentOptionsComp() {
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
        <section className="paymentOptionsCardsWrapper">
          <article className={`paymentOptionsCard ${selectedCard === 0 ? 'selected' : ''}`} onClick={() => handleCardClick(0)}>
            <img className="paymentOptionsImage" src={ideal} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 1 ? 'selected' : ''}`} onClick={() => handleCardClick(1)}>
            <img className="paymentOptionsImage" src={creditcard} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 2 ? 'selected' : ''}`} onClick={() => handleCardClick(2)}>
            <img className="paymentOptionsImage" src={paypal} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 3 ? 'selected' : ''}`} onClick={() => handleCardClick(3)}>
            <img className="paymentOptionsImage" src={klarna} alt="" />
          </article>
          <article className={`paymentOptionsCard ${selectedCard === 4 ? 'selected' : ''}`} onClick={() => handleCardClick(4)}>
            <img className="paymentOptionsImage" src={googlepay} alt="" />
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

export default PaymentOptionsComp;
