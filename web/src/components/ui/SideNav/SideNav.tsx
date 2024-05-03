import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import MessageIcon from "@mui/icons-material/Message";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaymentIcon from "@mui/icons-material/Payment";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useUser } from "../../../context/UserContext";
import "./SideNav.css";

function SideNav() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        user &&
        user.signInUserSession &&
        user.signInUserSession.accessToken &&
        user.signInUserSession.accessToken.payload
      ) {
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups && groups.includes("Homeowner")) {
          setIsHomeowner(true)
        } else if (groups && groups.includes("Professional")) {
          setIsProfessional(true);
        }
      } else {
        // Handle the case where the user data is not fully available
        console.log("User data is not fully available.");
        navigate("/login"); // Redirect to login or another appropriate page
      }
    }, 500000); // Delay in milliseconds (5000ms = 5s)

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts before the timeout is called
  }, [user, navigate]);

  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {isProfessional ? (
          <>
            <li className="sidebar-item">
              <NavLink
                to="/nl/pro-dashboard"
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
                to="/nl/pro-dashboard/chat"
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
                to="/nl/pro-dashboard/reporting"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <StarOutlineIcon />
                Reporting
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/nl/pro-dashboard/jobs"
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
                to="/nl/pro-dashboard/calendar"
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
                to="/nl/pro-dashboard/reviews"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <StarOutlineIcon />
                Reviews
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink
                to="/nl/pro-dashboard/settings"
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
                to="/nl/pro-dashboard/setup"
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                <SettingsIcon />
                Setup
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="sidebar-item">
              <NavLink
                to="/nl/homeowner-dashboard"
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
                to="/nl/homeowner-dashboard/jobs"
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
                to="/nl/homeowner-dashboard/chat"
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
                to="/nl/homeowner-dashboard/calender"
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
                to="/nl/homeowner-dashboard/payments"
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
                to="/nl/homeowner-dashboard/reviews"
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
                  to="/nl/homeowner-dashboard/profile"
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
                  to="/nl/homeowner-dashboard/settings"
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
                  to="/nl/homeowner-dashboard/help"
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
}

export default SideNav;
