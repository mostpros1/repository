import React from "react";
import lockkey from "../../assets/locked_icon_dude.svg";

import "./termsandconditions.css";
import TermsAndConditionsHomeOwner from "./TermsandcConditionsHomeOwner";


const TermsAndCondition = () => {
  return (
    <main id="terms-Main">
      <section id="terms-UpperSection">
        <h1>Algemene voorwaarden</h1>
        <img id="terms-image" src={lockkey} alt="Privacy Lock" />
      </section>
      <section id="terms-LowerSection">
      <TermsAndConditionsHomeOwner />
      </section>
    </main>
  );
};

export default TermsAndCondition;
