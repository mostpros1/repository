import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';

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
        <NavLinks />
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
