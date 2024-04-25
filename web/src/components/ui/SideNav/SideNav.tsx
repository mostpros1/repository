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
  const [IsHomeOwner, setIsHomeOwner] = useState(false);
  const [IsHomeOwner, setIsHomeOwner] = useState(false);
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
          setIsHomeOwner(true);
        } else if (groups && groups.includes("Professional")) {
          setIsProfessional(true);
        }
      } else {
        // Handle the case where the user data is not fully available
        console.log("User data is not fully available.");
        navigate("/login"); // Redirect to login or another appropriate page
      }
    }, 500); // Delay in milliseconds (5000ms = 5s)

    return () => clearTimeout(timer); // Clear the timeout if the component unmounts before the timeout is called
  }, [user, navigate]); // Depend on user and navigate to ensure updates
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        {isProfessional && (
          <li className="sidebar-item">
            <NavLink
              to="/specialist-resultaat"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <DashboardIcon />
              Dashboard
            </NavLink>
          </li>
        )}
        <li className="sidebar-item">
          <NavLink
            to="/Jobs"
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
            to="/chat"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <MessageIcon />
            Message
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/Calendar"
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
            to="/Payments"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            <PaymentIcon />
            Payments
          </NavLink>
        </li>
        <li className="sidebar-item">
          <NavLink
            to="/ReviewPage"
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
              to="/Profile"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <AccountCircleIcon />
              Profile
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink
              to="/HomeOwnerSettingsPage"
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
              to="/Helpdesk"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <HelpOutlineIcon />
              Helpdesk
            </NavLink>
          </li>
        </div>
      </ul>
    </div>
  );
}
export default SideNav;






