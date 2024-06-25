import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 307</h1>
        <p className="ErrorPage-message">De server geeft aan dat de client de aanvraag moet herhalen naar de gegeven URI, maar alle verzoeksheaders moeten worden hergebruikt.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>

  );
};

export default ErrorPage;
