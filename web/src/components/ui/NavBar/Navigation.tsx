import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Auth } from "aws-amplify";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import NineDots from "../../../assets/nine-dots.svg";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useUser } from "../../../context/UserContext";
import { useUserType } from "../../../useUserTypeContext";

interface UserState {
  isProfessional: boolean;
  setIsProfessional: (value: boolean) => void;
  isHomeowner: boolean;
  setIsHomeowner: (value: boolean) => void;
}

export let taal = "nl";

if (
  window.location.pathname.split("/")[1] === "nl" ||
  window.location.pathname.split("/")[1] === "en"
) {
  taal = window.location.pathname.split("/")[1];
}
console.log("test ", taal);

function Navigation() {
  const { isProfessional, setIsProfessional, isHomeowner, setIsHomeowner } =
    useUserType() as UserState;

  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate(`/${taal}/home-innovation`);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  useEffect(() => {
    const delay = 2000; // Delay in milliseconds (e.g., 2000ms = 2 seconds)

    const checkUserType = () => {
      const currentURL = window.location.href;
      if (currentURL.includes("dashboard")) {
        if (user?.signInUserSession?.accessToken?.payload) {
          const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
          if (groups?.includes("Homeowner")) {
            setIsHomeowner(true);
            setIsProfessional(false);
          } else if (groups?.includes("Professional")) {
            setIsProfessional(true);
            setIsHomeowner(false);
          }
        } else {
          console.log("User data is not fully available.");
          navigate(`/${taal}/login`);
        }
      }
    };

    const timer = setTimeout(checkUserType, delay);

    // Cleanup the timer if the component unmounts or user changes
    return () => clearTimeout(timer);
  }, [user]);

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

  const handleDashboardSwitch = () => {
    if (isProfessional) {
      setIsProfessional(false);
      setIsHomeowner(true);
      navigate(`/${taal}/homeowner-dashboard/jobs`);
    } else if (isHomeowner) {
      setIsProfessional(true);
      setIsHomeowner(false);
      navigate(`/${taal}/pro-dashboard`);
    }
  };

  let authButtons = (
    <>
      <Link to={`/${taal}/login`}>{t("Login")}</Link>{" "}
      <Link to={`/${taal}/register`}>{t("Register")}</Link>{" "}
    </>
  );

  if (user) {
    const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
    let DashboardLink: React.ReactElement | null = null;
    if (groups && groups.includes("Homeowner")) {
      DashboardLink = (
        <Link to={`/${taal}/homeowner-dashboard/jobs`}>{t("Account")}</Link>
      );
    } else if (groups && groups.includes("Professional")) {
      DashboardLink = <Link to={`/${taal}/pro-dashboard`}>{t("Account")}</Link>;
    }

    authButtons = (
      <>
        <p>{user.attributes.email}</p>
        {DashboardLink}
        <button onClick={handleLogout}>{t("Logout")}</button>{" "}
      </>
    );
  }

  return (
    <div className="nav-container">
      <head>
        <title>Mostpros</title>
      </head>
      <Link to={`/${taal}/`}>
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">Mostpros</h1>
        </div>
      </Link>
      <div className="nav-rightside">
        <ul className="nav-list">
          <li>
            <Link to={``} className="black-items">
              {t("Klussen")} <ExpandMoreIcon />
            </Link>
            <div className="mega-box">
              <div className="mega-content">
                <div className="mega-row">
                  <header>{t("Interieur")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/jobs#interieuradviseur`}>
                        {t("InterieurAdviseur")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#loodgieter`}>
                        {t("Loodgieter")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#elektricien`}>
                        {t("Elektricien")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#timmerman`}>
                        {t("Timmerman")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#schoonmaker`}>
                        {t("Schoonmaker")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#interieurschilder`}>
                        {t("Interieur schilder")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#behanger`}>{t("Behanger")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#keukenmonteur`}>
                        {t("Keukenmonteur")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#tegelzetter`}>
                        {t("Tegelzetter")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#badkamerspecialist`}>
                        {t("Badkamerspecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#stukadoor`}>
                        {t("Stukadoor")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#verwarmingsinstallateur`}>
                        {t("Verwarmingsinstallateur")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#stoffeerder`}>
                        {t("Stoffeerder")}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Exterieur")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/jobs#aannemer`}>{t("Aannemer")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#exterieurschilder`}>
                        {t("Exterieur schilder")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#dakdekker`}>
                        {t("Dakdekker")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#gevelspecialist`}>
                        {t("Gevelspecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#isolatiespecialist`}>
                        {t("Isolatiespecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#metselaar`}>
                        {t("Metselaar")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#glaszetter`}>
                        {t("Glaszetter")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#kozijspecialist`}>
                        {t("Kozijnspecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#schoorsteenveger`}>
                        {t("Schoorsteenveger")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#laadpaalspecialist`}>
                        {t("Laadpaalspecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#zonnepaneelspecialist`}>
                        {t("Zonnepaneelspecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#beveiligingsspecialist`}>
                        {t("Beveiligingsspecialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#toegangsspecialist`}>
                        {t("Toegangsspecialist")}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Tuin")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/jobs#tuinontwerper`}>
                        {t("Tuinontwerper")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#hovenier`}>{t("Hovenier")}</Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#stratenmaker`}>
                        {t("Stratenmaker")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#tuintechnicus`}>
                        {t("Tuintechnicus")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#zwembadinstallateur`}>
                        {t("Zwembadinstallateur")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#smartgardenadviseur`}>
                        {t("Smart garden adviseur")}
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-row">
                  <header>{t("Meer")}</header>
                  <ul className="mega-links">
                    <li>
                      <Link to={`/${taal}/jobs#moderneklusser`}>
                        {t("Moderne klusser")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#verhuizer`}>
                        {t("Verhuizer")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#slotenmaker`}>
                        {t("Slotenmaker")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#verduurzamingsadviseur`}>
                        {t("Verduurzamingsadviseur")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#ongediertebestrijder`}>
                        {t("Ongediertebestrijder")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#voertuigmonteur`}>
                        {t("Voertuig monteur")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#domoticaspecialist`}>
                        {t("Domotica specialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#smarthomespecialist`}>
                        {t("Smart home specialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#aihomespecialist`}>
                        {t("AI home specialist")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#dronepiloot`}>
                        {t("Drone piloot")}
                      </Link>
                    </li>
                    <li>
                      <Link to={`/${taal}/jobs#robotadviseur`}>
                        {t("Robot adviseur")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
          <li>
            <Link to={`/${taal}/why-mostpros/`} className="black-items">
              {t("Waarom Mostpros")} <ExpandMoreIcon />
            </Link>
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
                      <Link to={`/${taal}/`}>
                        {t("Automatiseer workflows")}
                      </Link>
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
            {user &&
            user.signInUserSession.accessToken.payload[
              "cognito:groups"
            ]?.includes("Professional") ? (
              <button onClick={handleDashboardSwitch} className="black-items">
                {t("Switch Dashboard")}
              </button>
            ) : (
              <Link to={`/${taal}/pro-onboarding`} className="black-items">
                {t("Inschrijven als vakspecialist")}
              </Link>
            )}
          </li>
        </ul>
        <div id="nine-dots">
          <img src={NineDots} onClick={handleIconClick} />
        </div>
        <div className="dropdown-container">
          <button className="loginButton" onClick={handleDropdownToggle}>
            <MenuIcon />
            <PermIdentityIcon />
          </button>
          {taal && dropdownOpen && (
            <div className="dropdown-content">{authButtons}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navigation;
