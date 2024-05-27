import "./MobileNav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import CloseIcon from "@mui/icons-material/Close";

export const taal = window.location.pathname.split('/')[1];

function MobileNav() {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="mobile-nav">
      <Link to={`/${taal}/`}>
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">Mostpros</h1>
        </div>
      </Link>
      <div className="menu-icon" onClick={toggleSidebar}>
        <p>Menu</p>
        {open ? <CloseIcon /> : <MenuIcon />}
      </div>
      {open && <NavLinks toggleSidebar={toggleSidebar} />}
    </div>
  );
}

export default MobileNav;
