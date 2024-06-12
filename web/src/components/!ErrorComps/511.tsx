import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 511</h1>
        <p className="ErrorPage-message">Netwerkauthenticatie is vereist om toegang te krijgen.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>
  );
};

export default ErrorPage;
