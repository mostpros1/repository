import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 428</h1>
        <p className="ErrorPage-message">De server vereist dat de client voorwaardelijke verzoeken doet om de aanvraag te voltooien.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>



  );
};

export default ErrorPage;
