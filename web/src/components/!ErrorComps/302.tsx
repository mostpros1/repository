import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 302</h1>
        <p className="ErrorPage-message">De gevraagde bron is tijdelijk verplaatst naar een andere locatie, maar de client moet de oorspronkelijke URI blijven gebruiken voor toekomstige aanvragen.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>

  );
};

export default ErrorPage;
