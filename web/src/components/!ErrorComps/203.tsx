import React from 'react';
import './Error.css';

const ErrorPage = () => {
    return (
<div className="ErrorPage">
    <div className="ErrorPage-content">
        <h1 className="ErrorPage-title">Code: 203</h1>
        <p className="ErrorPage-message">De server heeft een succesvolle reactie gegeven die echter afkomstig is van een andere bron dan de oorspronkelijke server.</p>
        <a className="ErrorPage-link" href="/">Terug naar de startpagina</a>
    </div>
</div>
    );
}

export default ErrorPage;
