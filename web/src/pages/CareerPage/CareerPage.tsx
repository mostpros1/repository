import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import Vacatures from "../../components/Vacatures/Vacatures";
import careertemp from "../../assets/careerpagegirl.svg";
import "./CareerPage.css";

const CareerPage = () => {
  return (
    <>
      <NavBar />
      <section className="CareerInfoSection">
        <p className="CareerInfoP">
          Op zoek naar een nieuwe uitdaging of stage? Bouw, creëer en ontwikkel
          samen met ons aan de All-in 1 Home Service App.
        </p>
        <img className="CareerInfoIMG" src={careertemp} alt="career" />
      </section>
      <div className="vacature-con">
        <Vacatures />
      </div>
      <Footer />
    </>
  );
};

export default CareerPage;