import "./SideNav.css";
import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

// Icons from Material UI
import DashboardIcon from "@mui/icons-material/Dashboard";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import MessageIcon from "@mui/icons-material/Message";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PaymentIcon from "@mui/icons-material/Payment";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function SideNav() {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li className="sidebar-item">
          <NavLink
            to="/MijnKlussen"
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
