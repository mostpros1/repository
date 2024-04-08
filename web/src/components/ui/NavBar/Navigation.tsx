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
import { Apps, Chat, Message } from "@mui/icons-material";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, updateUser } = useUser(); // Assuming you have a useUser hook
  const navigate = useNavigate(); // Create a navigate function


  // Get the user's display name
  const getDisplayName = () => {
    return user.attributes.name || user.username;
  };

  // const handleIconClick = () => {
  //   navigate("/HomeInovation"); // Use navigate function to redirect
  // };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };


  // Logout function
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
            <ChatBubbleOutlineRoundedIcon />
          </li>
        </ul>
        {/* <div className="apps-icon" onClick={handleIconClick}>
          <AppsRoundedIcon />
        </div> */}
        <div className="dropdown-container">
          <div className="loginButton" onClick={handleDropdownToggle}>
            <PermIdentityIcon />
          </div>
          {dropdownOpen && (
            <div className="dropdown-content">{authButtons}</div>
          )}
        </div>
        <p>
          Welcome <br />
          {/* Display the user's name if logged in */}
          {user && <span>{getDisplayName()}</span>} 
        </p>
      </div>
    </div>
  );
}

export default Navigation;
