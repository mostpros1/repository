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
    if (
      user &&
      user.signInUserSession &&
      user.signInUserSession.accessToken &&
      user.signInUserSession.accessToken.payload
    ) {
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
      if (groups) {
        if (groups.includes("Homeowner")) {
          setIsProfessional(false);
        } else if (groups.includes("Professional")) {
          setIsProfessional(true);
        }
      } else {
        // Handle the case where the user is not assigned to any group
        console.log("User is not assigned to any group.");
        navigate("/"); // Redirect to appropriate page
      }
    } else {
      // Handle the case where the user data is not fully available
      console.log("User data is not fully available.");
      navigate("/nl/login"); // Redirect to login or another appropriate page
    }
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
                Chat
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
                Jobs
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
                Calendar
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
                Settings
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
                Kalendar
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
                  Settings
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
