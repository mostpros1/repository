import "./Footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footerSection">
          <h4>Navigatie</h4>
          <a href="">Hoe werkt het</a>
          <a href="">Waarom mostpros</a>
          <Link to="/over-ons">Over</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footerSection">
          <h4>Netwerk</h4>
          <p>Vakspecialist</p>
          <p>Huiseigenaren</p>
          <p>Developers</p>
          <p>Partners</p>
          <p>Studenten</p>
          <p>Startups</p>
        </div>
        <div className="footerSection">
          <h4>Office</h4>
          <p>2013 AS, Haarlem</p>
          <p>Kinderhuissingel 6-K</p>
        </div>
        <div className="footerSection">
          <h4>Social</h4> 
          <LinkedInIcon />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
