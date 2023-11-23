import "./Footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
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
          <Link to="/admin-paneel">Admin</Link>
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
          <div className="footerSection_icons">
            <a className="link_socials li" href="https://www.linkedin.com/company/mostpros/" target="_blank">
              <LinkedInIcon />
            </a>
            <a className="link_socials insta" href="https://www.instagram.com/mostpros/" target="_blank">
              <InstagramIcon />
            </a>
            <a className="link_socials x" href="https://twitter.com/mostpros" target="_blank">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="cpad_wrapper">
        <p>©2023</p>
        <Link to="/privacybeleid">Privacybeleid.</Link>
        <Link to="/algemene-voorwaarden">Algemene voorwaarden.</Link>
        <Link to="/disclaimer">Disclaimer.</Link>
      </div>
    </footer>
  );
}

export default Footer;
