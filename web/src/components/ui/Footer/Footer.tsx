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
          <Link to="/inschrijven-als-specialist">Inschrijven als vakspecialist</Link>
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
          <Link to="https://www.google.com/maps/place/Kinderhuissingel+6-K,+2013+AS+Haarlem/@52.3877043,4.6284608,17z/data=!3m1!4b1!4m6!3m5!1s0x47c5ef129ebb1a5f:0x7bc9cc867d779777!8m2!3d52.3877043!4d4.6310357!16s%2Fg%2F11pcm0bx6l?entry=ttu">
            <h4>Office</h4>
            <p>2013 AS, Haarlem</p>
            <p>Kinderhuissingel 6-K</p>
          </Link>
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
         <Link to="/SpecialistProfile">.</Link>  {/*added this for testing purposes */}
      </div>
    </footer>
  );
}
export default Footer;