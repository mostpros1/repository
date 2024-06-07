import React from 'react';
import './Error.css';

const ErrorPage = () => {
    return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 103</h1>
        <p className="ErrorPage-message">De server heeft alvast enkele headers verzonden als antwoord op de clientaanvraag, voordat het eigenlijke antwoord met de inhoud wordt verzonden.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>

    );
}

export default ErrorPage;
