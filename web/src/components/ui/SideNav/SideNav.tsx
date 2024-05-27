import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
import { useUser } from "../../../context/UserContext";
import "./SideNav.css";

const SideNav = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { lang } = useParams();  // Extract the lang parameter
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);

  useEffect(() => {
    if (user?.signInUserSession?.accessToken?.payload) {
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups?.includes("Homeowner")) {
        setIsHomeowner(true);
      } else if (groups?.includes("Professional")) {
        setIsProfessional(true);
      }
    } else {
      console.log("User data is not fully available.");
      navigate(`/${lang}/login`);
    }
  }, [user, navigate, lang]);

  const comingSoonTabs = [
    { path: "revenues", label: "Inkomsten" },
    { path: "reporting", label: "Rapporten" },
    { path: "occupancy-ahr", label: "Bezettingsgraad" },
    { path: "screening", label: "Screening" },
    { path: "promo-codes", label: "Promo codes" },
    { path: "setup", label: "Setup" },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {isProfessional ? (
          <>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <DashboardIcon />
                Dashboard
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/calender`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <DateRangeIcon />
                Kalender
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/jobs`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HandymanOutlinedIcon />
                Klussen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/chat`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <MessageIcon />
                Berichten
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/profile`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <AccountCircleIcon />
                Profiel
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/settings`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <SettingsIcon />
                Instellingen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/pro-dashboard/help`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HelpOutlineIcon />
                Help
              </NavLink>
            </li>
            {comingSoonTabs.map((tab) => (
              <li className="sidebar-item coming-soon" key={tab.path}>
                <div className="sidebar-link">
                  <StarOutlineIcon />
                  {tab.label}
                  <div className="coming-soon-tooltip">Binnenkort online</div>
                </div>
              </li>
            ))}
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/jobs`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <HandymanOutlinedIcon />
                Klussen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/chat`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <MessageIcon />
                Berichten
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/payments`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <PaymentIcon />
                Betalingen
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to={`/${lang}/homeowner-dashboard/reviews`}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <StarOutlineIcon />
                Reviews
              </NavLink>
            </li>
            <div className="sidebar-bottom">
              <li className="sidebar-item">
                <NavLink
                  to={`/${lang}/homeowner-dashboard/profile`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  <AccountCircleIcon />
                  Profiel
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to={`/${lang}/homeowner-dashboard/settings`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  <SettingsIcon />
                  Instellingen
                </NavLink>
              </li>
              <li className="sidebar-item">
                <NavLink
                  to={`/${lang}/homeowner-dashboard/FAQPage`}
                  className={({ isActive }) =>
                    isActive ? "sidebar-link active" : "sidebar-link"
                  }
                >
                  <HelpOutlineIcon />
                  Help
                </NavLink>
              </li>
            </div>
          </>
        )}
      </ul>
    </div>
  );
};

export default SideNav;
