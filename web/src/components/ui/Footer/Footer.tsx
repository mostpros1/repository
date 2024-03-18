import "./Footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div className="footerSection">
          <h4>Bedrijf</h4>
          <Link to="/hoe-werkt-het">Hoe werkt het</Link>
          <a href="">Waarom mostpros</a>
          <Link to="/over-ons">Over</Link>
          <Link to="/over-ons">Jobs</Link>
          <Link to="/over-ons">Product updates</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footerSection">
          <h4>Huiseigenaar</h4>
          <p>Vind vakspecialist</p>
          <p>Help</p>
        </div>
        <div className="footerSection">
          <h4>Vakspecialist</h4>
          <Link to="/over-ons">Inschrijven als vakspecialist</Link>
          <p>Pro bedrijven centrum</p>
          <p>Help voor professionals</p>
        </div>
        <div className="footerSection">
          <h4>Netwerk</h4>
          <p>Huiseigenaren</p>
          <p>Vakspecialisten</p>
          <p>Developers</p>
          <p>Partners</p>
          <p>Studenten</p>
          <p>Startups</p>
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
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/VSDashboard">.</Link>
      </div>
    </footer>
  );
}
export default Footer;