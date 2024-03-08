import React, { useState } from "react";
import "./JobDisc.css";

const JobDisc = () => {
    return (
        <div className="job_disc_con">
            <div className="JobDiscTitle">
                <h3>Loodgieters werk: nieuwe leiding aanleggen</h3>
            </div>
            <div className="JobDiscContent">
                <div className="JobDiscContentLeft">
                    <h4>Beschrijving</h4>
                    <h5>Opdrachtgever</h5>
                    <p>Lisa Zoetlief</p>
                    <h5>Type Klus</h5>
                </div>
            </div>
        </div>
    );
};

export default JobDisc;
