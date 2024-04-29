import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "../../../context/UserContext";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";

function Navigation() {
  const { t } = useTranslation(); // Use useTranslation hook to access translation functions
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate("/HomeInovation");
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      updateUser(authenticatedUser);
    } catch (error) {
      updateUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      updateUser(null);
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let authButtons = (
    <>
      <Link to="/login">{t("Login")}</Link> {/* Translate login button */}
      <Link to="/registreer">{t("Register")}</Link> {/* Translate register button */}
    </>
  );

  if (user) {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    let DashboardLink: React.ReactNode = null;
    if (groups && groups.includes("Homeowner")) {
      DashboardLink = <Link to="/Jobs">{t("Account")}</Link>; {/* Translate account link */}
    } else if (groups && groups.includes("Professional")) {
      DashboardLink = <Link to="/specialist-resultaat">{t("Account")}</Link>; {/* Translate account link */}
    }

    authButtons = (
      <>
        <p>{user.attributes.email}</p>
        {DashboardLink}
        <button onClick={handleLogout}>{t("Logout")}</button> {/* Translate logout button */}
      </>
    );
  }

  return (
    <div className="nav-container">
      <Link to="/">
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">Mostpros</h1>
        </div>
      </Link>
      <div className="nav-rightside">
        <ul className="nav-list">
          <li>
            <Link to="/mijn-klussen" className="black-items">
              {t("Klussen")} <ExpandMoreIcon />
            </Link>
            {/* Translate mega menu items */}
            <div className="mega-box">
              <div className="mega-content">
                {/* Mega menu content */}
              </div>
            </div>
          </li>
          <li>
            <Link to="/" className="black-items">
              {t("Waarom Mostpros")} <ExpandMoreIcon />
            </Link>
            {/* Translate dropdown menu items */}
            <div className="mega-box">
              <div className="mega-content">
                {/* Dropdown menu content */}
              </div>
            </div>
          </li>
          <li className="nav-blue-btn">
            <Link to="/inschrijven-als-specialist" className="black-items">
              {t("Inschrijven als vakspecialist")} {/* Translate button */}
            </Link>
          </li>
        </ul>
        {/* Apps icon */}
        <div className="apps-icon" onClick={handleIconClick}>
          <AppsRoundedIcon />
        </div>
        {/* Dropdown */}
        <div className="dropdown-container">
          <button className="loginButton" onClick={handleDropdownToggle}>
            <MenuIcon />
            <PermIdentityIcon />
          </button>
          {dropdownOpen && (
            <div className="dropdown-content">{authButtons}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;