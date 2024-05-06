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

export const taal = window.location.pathname.split('/')[1];
console.log("test ", taal);

function Navigation() {
  const { t } = useTranslation(); // Use useTranslation hook to access translation functions
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  // Assuming navigate is obtained from useNavigate


  const handleIconClick = () => {
    navigate(`/${taal}/home-innovation`); // Use navigate function to redirect
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
      <Link to={`/${taal}/login`}>{t("Login")}</Link> {/* Translate login button */}
      <Link to={`/${taal}/register`}>{t("Register")}</Link> {/* Translate register button */}
    </>
  );

  if (user) {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    let DashboardLink: React.ReactNode = null;
    if (groups && groups.includes("Homeowner")) {
      DashboardLink = <Link to={`/${taal}/homeowner-dashboard/jobs`}>{t("Account")}</Link>; {/* Translate account link */ }
    } else if (groups && groups.includes("Professional")) {
      DashboardLink = <Link to={`/${taal}/pro-dashboard`}>{t("Account")}</Link>; {/* Translate account link */ }
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
      <Link to={`/${taal}/`}>
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">Mostpros</h1>
        </div>
      </Link>
      <div className="nav-rightside">
        <ul className="nav-list">
          <li>
            <Link to={`/${taal}/jobs-mostpros`} className="black-items">
              {t("Klussen")} <ExpandMoreIcon />
            </Link>
            {/* Translate mega menu items */}
            <div className="mega-box">
              <div className="mega-content">
                <div className="mega-row">
                  <header>{t("Interieur")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/`}>{t("InterieurAdviseur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Loodgieter")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Elektricien<")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Timmerman")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Schoonmaker")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Interieur schilder")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Behanger")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Keukenmonteur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Tegelzetter")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Badkamerspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Stukadoor")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Verwarmingsinstallateur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Stoffeerder")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Exterieur")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/`}>{t("Aannemer")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Exterieur schilder")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Dakdekker")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Gevelspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Isolatiespecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Metselaar")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Glaszetter")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Kozijnspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Schoorsteenveger")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Laadpaalspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Zonnepaneelspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Beveiligingsspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Toegangsspecialist")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Tuin")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/`}>{t("Tuinontwerper")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Hovenier")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Stratenmaker")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Tuintechnicus")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Zwembadinstallateur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Smart garden adviseur")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Meer")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/`}>{t("Moderne klusser")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Verhuizer")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Slotenmaker")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Verduurzamingsadviseur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Ongediertebestrijder")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Voertuig monteur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Domotica specialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Smart home specialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("AI home specialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Drone piloot")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Robot adviseur")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link to={`/${taal}/`} className="black-items">
              {t("Waarom Mostpros")} <ExpandMoreIcon />
            </Link>
            {/* Translate dropdown menu items */}
            <div className="mega-box">
              <div className="mega-content">
                <div className="mega-row">
                  <header>{t("Waarom MP kiezen")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/`}>{t("Klantenervaring")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Groeiend netwerk")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Toegang talentenpools")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Automatiseer workflows")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Open infrastructuur")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("500+ diensten")}</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Per gebruiker")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/`}>{t("Huiseigenaar")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Vakspecialist")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("VvE / Stichting")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Startup / Bedrijf")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Developer")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/`}>{t("Marketeer / Verkoper")}</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-blue-btn">
            <Link to={`/${taal}/pro-onboarding`} className="black-items">
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
    </div >
  );
}

export default Navigation;
