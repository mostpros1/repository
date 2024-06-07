import React from 'react';
import './Error.css';

const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <div className="ErrorPage-content">
                <h1 className="ErrorPage-title">Code: 101</h1>
                <p className="ErrorPage-message">De verbindingsproxy heeft de aanvraag geaccepteerd, maar de server reageert niet.</p>
                <a className="ErrorPage-link" href="/">Go back home</a>
            </div>
        </div>
    );
}

export default ErrorPage;
