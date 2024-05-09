import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import Vacatures from "../../components/Vacatures/Vacatures";
import careertemp from "../../assets/careerpagegirl.svg";
import "./CareerPage.css";



const CareerPage = () => {
    return (
        <div>
            <NavBar />
            <div className="career-con">
                <p>Op zoek naar een nieuwe uitdaging of stage?
                    Bouw, creëer en ontwikkel samen met ons aan
                    de All-in 1 Home Service App.</p>
                <img src={careertemp} alt="career" />
            </div>
            <Vacatures />
            <Footer />
        </div>
    );
};

export default CareerPage;
