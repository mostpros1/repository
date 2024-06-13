import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 406</h1>
        <p className="ErrorPage-message">De gevraagde bron is niet beschikbaar in een formaat dat acceptabel is volgens de accept-headers van de client.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>


  );
};

export default ErrorPage;
