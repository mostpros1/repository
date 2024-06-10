import React from 'react';
import './Error.css';

const ErrorPage = () => {
    return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 200</h1>
        <p className="ErrorPage-message">De clientaanvraag is succesvol verwerkt door de server en er zijn geen fouten opgetreden.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>
    );
}

export default ErrorPage;
