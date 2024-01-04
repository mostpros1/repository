import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="nav-container">
      <Link to="/">
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">
            Mostpros
          </h1>
        </div>
      </Link>
      <div className="nav-rightside">
        <ul className="nav-list">
          <li>
                <Link to="/mijn-klussen" className='black-items'>Klussen</Link>
          </li>
          <li>
                <Link to="/hoe-werkt-het" className='black-items'>Hoe werkt het</Link>
          </li>
          <li>
                <Link to="/" className='black-items'>Waarom Mostpros <ExpandMoreIcon/></Link>
                <div className="mega-box">
                  <div className="mega-content">
                    <div className="mega-row">
                      <header>Waarom MP kiezen</header>
                      <ul className="mega-links">
                        <li><Link to="/">Klantenervaring</Link></li>
                        <li><Link to="/">Groeiend netwerk</Link></li>
                        <li><Link to="/">Toegang talentenpools</Link></li>
                        <li><Link to="/">Automatiseer workflows</Link></li>
                        <li><Link to="/">Open infrastructuur</Link></li>
                        <li><Link to="/">500+ diensten</Link></li>
                      </ul>
                    </div>
                    <div className="mega-row">
                      <header>Per gebruiker</header>
                      <ul className="mega-links">
                        <li><Link to="/">Huiseigenaar</Link></li>
                        <li><Link to="/">Vakspecialist</Link></li>
                        <li><Link to="/">VvE / Stichting</Link></li>
                        <li><Link to="/">Startup / Bedrijf</Link></li>
                        <li><Link to="/">Developer</Link></li>
                        <li><Link to="/">Marketeer / Verkoper</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
          </li>
          <li className="nav-blue-btn">
                <Link to="/inschrijven-als-specialist" className='black-items'>Inschrijven als vakspecialist</Link>
          </li>
        </ul> 
        <div className="dropdown-container">
          <button className="loginButton" onClick={handleDropdownToggle}>
            <MenuIcon />
            <PermIdentityIcon />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">
              <Link to="/login">Login</Link>
              <Link to="/registreer" >Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
