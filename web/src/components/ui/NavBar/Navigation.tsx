import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MenuIcon from '@mui/icons-material/Menu';

function Navigation() {
  return (
    <div className="nav-container">
      <Link to="/">
        <div className="nav-leftside">
          <img src={Logo} alt="" />
          <h1 className="black-h1">
            Mostpros
          </h1>
        </div>
      </Link>
      <div className="nav-rightside">
        <NavLinks />
        <button className="loginButton">
          <MenuIcon />
          <PermIdentityIcon />          
        </button>
      </div>
    </div>
  );
}

export default Navigation;
