import "./MobileNav.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import CloseIcon from "@mui/icons-material/Close";

function MobileNav() {
  const [open, setOpen] = useState(false);

  const hamburgerIcon = <MenuIcon onClick={() => setOpen(!open)} />;

  const closeIcon = <CloseIcon onClick={() => setOpen(!open)} />;
  return (
    <div className="mobile-nav">
      <Link to="/">
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">Mostpros</h1>
        </div>
      </Link>
      {open ? closeIcon : hamburgerIcon}
      {open && <NavLinks />}
    </div>
  );
}

export default MobileNav;