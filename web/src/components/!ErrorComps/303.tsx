import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 303</h1>
        <p className="ErrorPage-message">De server heeft de clientaanvraag verwerkt en een nieuwe URI teruggegeven waar de client een nieuwe aanvraag naar moet sturen.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>

  );
};

export default ErrorPage;
