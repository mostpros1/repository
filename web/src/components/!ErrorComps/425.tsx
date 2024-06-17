import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 425</h1>
        <p className="ErrorPage-message">De server weigert de aanvraag te verwerken omdat deze te vroeg is.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>



  );
};

export default ErrorPage;
