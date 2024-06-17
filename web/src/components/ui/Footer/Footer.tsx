import "./Footer.css";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <section className="footer_container">
        <article className="footerSection">
          <h4>Bedrijf</h4>
          <Link to="/nl/how-it-works">Hoe werkt het</Link>
          <a href="/nl/why-mostpros">Waarom mostpros</a>
          <Link to="/nl/about">Over</Link>
          <Link to="/nl/career">Career</Link>
          <Link to="/nl/product-updates">Product updates</Link>
          <Link to="/nl/quality">Kwaliteitseisen</Link>
          <Link to="/nl/contact">Contact</Link>
        </article>
        <section className="footerSection">
          <h4>Huiseigenaar</h4>
          <Link to="/nl/">Vind vakspecialist</Link>
          <Link to="/nl/help">Help</Link>
        </section>
        <article className="footerSection">
          <h4>Vakspecialist</h4>
          <Link to="/nl/pro-onboarding">Inschrijven als vakspecialist</Link>
          <p>Pro bedrijven centrum</p>
          <Link to="/nl/help">Help voor professionals</Link>
        </article>
        <article className="footerSection">
          <h4>Netwerk</h4>
          <p>Huiseigenaren</p>
          <p>Vakspecialisten</p>
          <p>Developers</p>
          <p>Partners</p>
          <p>Studenten</p>
          <p>Startups</p>
        </article>
        <article className="footerSection">
          <h4>Office</h4>
          <Link
            id="footer-office-link"
            to="https://www.google.com/maps/place/Kinderhuissingel+6-K,+2013+AS+Haarlem/@52.3877043,4.6284608,17z/data=!3m1!4b1!4m6!3m5!1s0x47c5ef129ebb1a5f:0x7bc9cc867d779777!8m2!3d52.3877043!4d4.6310357!16s%2Fg%2F11pcm0bx6l?entry=ttu"
          >
            <p>2013 AS, Haarlem</p>
            <p>Kinderhuissingel 6-K</p>
          </Link>
        </article>
        <section className="footerSection">
          <h4>Social</h4>
          <article className="footerSection_icons">
            <a
              className="link_socials li"
              href="https://www.linkedin.com/company/mostpros/"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a
              className="link_socials insta"
              href="https://www.instagram.com/mostpros/"
              target="_blank"
            >
              <InstagramIcon />
            </a>
            <a
              className="link_socials x"
              href="https://twitter.com/mostpros"
              target="_blank"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </article>
        </section>
      </section>
      <article className="cpad_wrapper">
        <p>©{currentYear}</p>
        <Link to="/privacy-policy/">Privacybeleid.</Link>
        <Link to="/algemene-voorwaarden">Algemene voorwaarden.</Link>
        <Link to="/disclaimer">Disclaimer</Link>
      </article>
    </footer>
  );
}
export default Footer;
