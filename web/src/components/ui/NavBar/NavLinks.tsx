import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dashboard as DashboardIcon,
  HandymanOutlined as HandymanOutlinedIcon,
  Message as MessageIcon,
  DateRange as DateRangeIcon,
  Payment as PaymentIcon,
  StarOutline as StarOutlineIcon,
  AccountCircle as AccountCircleIcon,
  Settings as SettingsIcon,
  HelpOutline as HelpOutlineIcon,
} from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Auth } from "aws-amplify";

function NavLinks({ toggleSidebar }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const { lang } = useParams(); // Extract the lang parameter
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      if (user?.signInUserSession?.accessToken?.payload) {
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups?.includes("Homeowner")) {
          setIsHomeowner(true);
          setIsLoggedIn(true);
        } else if (groups?.includes("Professional")) {
          setIsProfessional(true);
          setIsLoggedIn(true);
        }
      }
    };

    checkUserRole();
  }, [user, navigate, lang]);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

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

  const comingSoonTabs = [
    { path: "revenues", label: "Inkomsten" },
    { path: "reporting", label: "Rapporten" },
    { path: "occupancy-ahr", label: "Bezettingsgraad" },
    { path: "screening", label: "Screening" },
    { path: "promo-codes", label: "Promo codes" },
    { path: "setup", label: "Setup" },
  ];

  return (
    <div className="nav-list-container">
      <div className="close-icon" onClick={toggleSidebar}>
        <p>Close Menu</p>
        <CloseIcon />
      </div>
      <ul className="nav-list-mobile">
        {isLoggedIn ? (
          <>
            {isProfessional ? (
              <>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <DashboardIcon />
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard/calender`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <DateRangeIcon />
                    Kalender
                  </NavLink>
                </li>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard/jobs`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <HandymanOutlinedIcon />
                    Klussen
                  </NavLink>
                </li>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard/chat`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <MessageIcon />
                    Berichten
                  </NavLink>
                </li>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard/profile`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <AccountCircleIcon />
                    Profiel
                  </NavLink>
                </li>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard/settings`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <SettingsIcon />
                    Instellingen
                  </NavLink>
                </li>
                <li className="nav-list-item">
                  <NavLink
                    to={`/${lang}/pro-dashboard/help`}
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    <HelpOutlineIcon />
                    Help
                  </NavLink>
                </li>
                {comingSoonTabs.map((tab) => (
                  <li className="nav-list-item coming-soon" key={tab.path}>
                    <div className="sidebar-link">
                      <StarOutlineIcon />
                      {tab.label}
                      <div className="coming-soon-tooltip">
                        Binnenkort online
                      </div>
                    </div>
                  </li>
                ))}
              </>
            ) : (
              <>
                <div className="navlink-top">
                  <li className="nav-list-item-tp">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/jobs`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <HandymanOutlinedIcon />
                      Klussen
                    </NavLink>
                  </li>
                  <li className="nav-list-item-tp">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/chat`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <MessageIcon />
                      Berichten
                    </NavLink>
                  </li>
                  <li className="nav-list-item-tp">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/payments`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <PaymentIcon />
                      Betalingen
                    </NavLink>
                  </li>
                  <li className="nav-list-item-tp">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/reviews`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <StarOutlineIcon />
                      Reviews
                    </NavLink>
                  </li>
                </div>
                <div className="navlink-bottom">
                  <li className="nav-list-item-btm">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/profile`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <AccountCircleIcon />
                      Profiel
                    </NavLink>
                  </li>
                  <li className="nav-list-item-btm">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/settings`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <SettingsIcon />
                      Instellingen
                    </NavLink>
                  </li>
                  <li className="nav-list-item-btm">
                    <NavLink
                      to={`/${lang}/homeowner-dashboard/FAQPage`}
                      className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                      }
                    >
                      <HelpOutlineIcon />
                      Help
                    </NavLink>
                  </li>
                </div>
              </>
            )}
            <li className="nav-list-item">
              <button id="nav-item-logout" onClick={handleLogout}>
                <AccountCircleIcon />
                Uitloggen
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="nav-list-item"></li>
            <div className="nav-item-logins">
              <li className="nav-list-item">
                <NavLink
                  to={`/${lang}/login`}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <button id="nav-item-btn">
                    <AccountCircleIcon />
                    Inloggen
                  </button>
                </NavLink>
              </li>
              <li className="nav-list-item">
                <NavLink
                  to={`/${lang}/register`}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <button id="nav-item-btn">
                    <AccountCircleIcon />
                    Registreren
                  </button>
                </NavLink>
              </li>

              <li className="nav-list-item">
                <NavLink
                  to={`/${lang}/pro-onboarding`}
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  <button id="nav-item-specialist-btn">
                    Inschrijven als Vakspecialist
                  </button>
                </NavLink>
              </li>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavLinks;
