import React from 'react'
import './Hero.css'

import searchIcon from "../../assets/icon _arrow circle right_.png"
function Hero() {
  return (
    <>
        <div className="hero">
            <h1>Vind lokale vakspecialisten voor klussen in je huis en tuin</h1>
            <h3>wat is je klus?</h3>
            <input type="text" name="searchbar" id="" />
            <div className="search">
                <h4>Inschrijven als vakspecialist</h4>
                <img src={searchIcon} alt="search icon" />
            </div>
        </div>
    </>
  )
}

export default Hero