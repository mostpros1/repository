import React from "react";
import "./Error.css";

const ErrorPage = () => {
  return (
    <div className="ErrorPage">
      <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Error 404</h1>
        <p className="ErrorPage-message">
          De pagina die je zoekt kan niet gevonden worden!
        </p>
        <a className="ErrorPage-link" href="/">
          Terug naar de startpagina
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
