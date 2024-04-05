import "./SideNav.css";
import React from "react";
import { Link } from "react-router-dom";
// Icons from Material UI
import DashboardIcon from "@mui/icons-material/Dashboard";
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
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
          <Link to="/dashboard" className="sidebar-link">
            <DashboardIcon />
            Dashboard
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/jobs" className="sidebar-link">
            <HandymanOutlinedIcon />
            Jobs
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/chats" className="sidebar-link">
            <MessageIcon />
            Chats
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/calendar" className="sidebar-link">
            <DateRangeIcon />
            Calendar
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/payments" className="sidebar-link">
            <PaymentIcon />
            Payments
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/reviews" className="sidebar-link">
            <StarOutlineIcon />
            Reviews
          </Link>
        </li>
        <div className="sidebar-bottom">
          <li className="sidebar-item">
            <Link to="/profile" className="sidebar-link">
              <AccountCircleIcon />
              Profile
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/settings" className="sidebar-link">
              <SettingsIcon />
              Settings
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/helpdesk" className="sidebar-link">
              <HelpOutlineIcon />
              Helpdesk
            </Link>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default SideNav;
