import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 505</h1>
        <p className="ErrorPage-message">De server ondersteunt de HTTP-versie die gebruikt werd in de aanvraag niet.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>




  );
};

export default ErrorPage;
