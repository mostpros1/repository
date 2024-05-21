import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import TermsAndCondition from "../../components/TermsAndConditions/termsandconditions";
// import "./TermsAndConditionsPage.css";  // uncomment this if u want to style this component

function TermsAndConditions() {
  return (
    <div id="root">
      <NavBar />
      <TermsAndCondition />
      <Footer />
    </div>
  );
}

export default TermsAndConditions;
