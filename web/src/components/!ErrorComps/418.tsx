import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 418</h1>
        <p className="ErrorPage-message">Ik ben een theepot (HTTP-statuscode 418).</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>


  );
};

export default ErrorPage;
