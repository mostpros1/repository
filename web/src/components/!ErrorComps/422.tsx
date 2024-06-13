import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 422</h1>
        <p className="ErrorPage-message">De server kan de aanvraag niet verwerken omdat het semantisch onjuist is.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>



  );
};

export default ErrorPage;
