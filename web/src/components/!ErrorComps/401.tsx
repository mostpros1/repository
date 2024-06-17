import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 401</h1>
        <p className="ErrorPage-message">Authenticatie is vereist en is mislukt of nog niet verstrekt.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>


  );
};

export default ErrorPage;
