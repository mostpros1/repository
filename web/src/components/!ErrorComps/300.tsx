import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 300</h1>
        <p className="ErrorPage-message">De server heeft meerdere mogelijke acties als reactie op de clientaanvraag geretourneerd, en de client moet kiezen welke te volgen.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>

  );
};

export default ErrorPage;
