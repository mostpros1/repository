import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import Logo from "../../../assets/cropped-23107-9-tools-transparent-image 1.svg";

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
        <button className="loginButton">Inloggen</button>
      </div>
    </div>
  );
}

export default Navigation;
