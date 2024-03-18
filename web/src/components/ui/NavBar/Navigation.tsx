import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Auth } from "aws-amplify";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MenuIcon from "@mui/icons-material/Menu";
import JoinChat from "../../Chat/JoinChat";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "../../../context/UserContext";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import { Apps } from "@mui/icons-material";

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, updateUser } = useUser(); // Assuming you have a useUser hook
  const navigate = useNavigate(); // Create a navigate function

  const handleIconClick = () => {
    navigate("/HomeInovation"); // Use navigate function to redirect
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      updateUser(null); // Update the user context after logout
      console.log("Logout successful"); // Update the user context after logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let authButtons = (
    <>
      <Link to="/login">Login</Link>
      <Link to="/registreer">Register</Link>
    </>
  );

  if (user) {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    let DashboardLink: JSX.Element | null = null;
    if (groups && groups.includes("Homeowner")) {
      DashboardLink = <Link to="/dashboard-huiseigenaar">Account</Link>;
    } else if (groups && groups.includes("Professional")) {
      DashboardLink = <Link to="/dashboard-professional">Account</Link>;
    }

    authButtons = (
      <>
        <p>{user.attributes.email}</p>
        {DashboardLink}
        <button onClick={handleLogout}>Uitloggen</button>
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
            {/* <Link to="/mijn-klussen" className="black-items">
              Klussen <ExpandMoreIcon />
            </Link> */}
            <div className="mega-box">
              <div className="mega-content">
                <div className="mega-row">
                  <header>Interieur</header>
                  <ul className="mega-links">
                    <li>
                      <Link to="/">Interieur adviseur</Link>
                    </li>
                    <li>
                      <Link to="/">Loodgieter</Link>
                    </li>
                    <li>
                      <Link to="/">Elektricien</Link>
                    </li>
                    <li>
                      <Link to="/">Timmerman</Link>
                    </li>
                    <li>
                      <Link to="/">Schoonmaker</Link>
                    </li>
                    <li>
                      <Link to="/">Interieur schilder</Link>
                    </li>
                    <li>
                      <Link to="/">Behanger</Link>
                    </li>
                    <li>
                      <Link to="/">Keukenmonteur</Link>
                    </li>
                    <li>
                      <Link to="/">Tegelzetter</Link>
                    </li>
                    <li>
                      <Link to="/">Badkamerspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Stukadoor</Link>
                    </li>
                    <li>
                      <Link to="/">Verwarmingsinstallateur</Link>
                    </li>
                    <li>
                      <Link to="/">Stoffeerder</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>Exterieur</header>
                  <ul className="mega-links">
                    <li>
                      <Link to="/">Aannemer</Link>
                    </li>
                    <li>
                      <Link to="/">Exterieur schilder</Link>
                    </li>
                    <li>
                      <Link to="/">Dakdekker</Link>
                    </li>
                    <li>
                      <Link to="/">Gevelspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Isolatiespecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Metselaar</Link>
                    </li>
                    <li>
                      <Link to="/">Glaszetter</Link>
                    </li>
                    <li>
                      <Link to="/">Kozijnspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Schoorsteenveger</Link>
                    </li>
                    <li>
                      <Link to="/">Laadpaalspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Zonnepaneelspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Beveiligingsspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">Toegangsspecialist</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>Tuin</header>
                  <ul className="mega-links">
                    <li>
                      <Link to="/">Tuinontwerper</Link>
                    </li>
                    <li>
                      <Link to="/">Hovenier</Link>
                    </li>
                    <li>
                      <Link to="/">Stratenmaker</Link>
                    </li>
                    <li>
                      <Link to="/">Tuintechnicus</Link>
                    </li>
                    <li>
                      <Link to="/">Zwembadinstallateur</Link>
                    </li>
                    <li>
                      <Link to="/">Smart garden adviseur</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>Meer</header>
                  <ul className="mega-links">
                    <li>
                      <Link to="/">Moderne klusser</Link>
                    </li>
                    <li>
                      <Link to="/">Verhuizer</Link>
                    </li>
                    <li>
                      <Link to="/">Slotenmaker</Link>
                    </li>
                    <li>
                      <Link to="/">Verduurzamingsadviseur</Link>
                    </li>
                    <li>
                      <Link to="/">Ongediertebestrijder</Link>
                    </li>
                    <li>
                      <Link to="/">Voertuig monteur</Link>
                    </li>
                    <li>
                      <Link to="/">Domotica specialist</Link>
                    </li>
                    <li>
                      <Link to="/">Smart home specialist</Link>
                    </li>
                    <li>
                      <Link to="/">AI home specialist</Link>
                    </li>
                    <li>
                      <Link to="/">Drone piloot</Link>
                    </li>
                    <li>
                      <Link to="/">Robot adviseur</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link to="/hoe-werkt-het" className="black-items">
              Hoe werkt het
            </Link>
          </li>
          <li>
            <Link to="/" className="black-items">
              Waarom Mostpros <ExpandMoreIcon />
            </Link>
            <div className="mega-box">
              <div className="mega-content">
                <div className="mega-row">
                  <header>Waarom MP kiezen</header>
                  <ul className="mega-links">
                    <li>
                      <Link to="/">Klantenervaring</Link>
                    </li>
                    <li>
                      <Link to="/">Groeiend netwerk</Link>
                    </li>
                    <li>
                      <Link to="/">Toegang talentenpools</Link>
                    </li>
                    <li>
                      <Link to="/">Automatiseer workflows</Link>
                    </li>
                    <li>
                      <Link to="/">Open infrastructuur</Link>
                    </li>
                    <li>
                      <Link to="/">500+ diensten</Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>Per gebruiker</header>
                  <ul className="mega-links">
                    <li>
                      <Link to="/">Huiseigenaar</Link>
                    </li>
                    <li>
                      <Link to="/">Vakspecialist</Link>
                    </li>
                    <li>
                      <Link to="/">VvE / Stichting</Link>
                    </li>
                    <li>
                      <Link to="/">Startup / Bedrijf</Link>
                    </li>
                    <li>
                      <Link to="/">Developer</Link>
                    </li>
                    <li>
                      <Link to="/">Marketeer / Verkoper</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-blue-btn">
            <Link to="/inschrijven-als-specialist" className="black-items">
              Inschrijven als vakspecialist
            </Link>
          </li>
        </ul>
        <div className="apps-icon" onClick={handleIconClick}>
            <AppsRoundedIcon />
        </div>
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
