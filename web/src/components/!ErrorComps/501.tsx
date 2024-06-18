import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 501</h1>
        <p className="ErrorPage-message">De server ondersteunt de functionaliteit die vereist is om de aanvraag te vervullen niet.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>




  );
};

export default ErrorPage;
