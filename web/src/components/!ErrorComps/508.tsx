import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 508</h1>
        <p className="ErrorPage-message">De server heeft een oneindige lus gedetecteerd bij het verwerken van de aanvraag.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>




  );
};

export default ErrorPage;
