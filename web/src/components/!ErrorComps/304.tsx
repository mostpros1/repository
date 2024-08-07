import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 304</h1>
        <p className="ErrorPage-message">De gevraagde bron is niet gemodificeerd sinds de laatste toegang van de client en daarom wordt er geen inhoud teruggestuurd.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>

  );
};

export default ErrorPage;
