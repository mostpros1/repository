import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 413</h1>
        <p className="ErrorPage-message">De aanvraag is groter dan de server bereid is of kan verwerken.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>


  );
};

export default ErrorPage;
