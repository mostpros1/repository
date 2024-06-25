import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 424</h1>
        <p className="ErrorPage-message">De aanvraag is mislukt vanwege een eerdere fout.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>



  );
};

export default ErrorPage;
