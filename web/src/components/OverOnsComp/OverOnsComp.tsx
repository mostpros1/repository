import "./OverOnsComp.css";
import groepsFoto from "../../assets/groepsFoto.jpg";
import Allin1ServiceImg from "../../assets/workingmantwo.png";
import AppStore from "../../assets/Appstore_button.png";
import WhyMostProsImg from "../../assets/workingman.png";
import PlayStore from "../../assets/Google-play-badge-1.png";
import "../HomePageTwo/HomePageTwo.css";
import { taal } from "../ui/NavBar/Navigation.tsx"; 
import { useNavigate } from "react-router-dom";

function OverOnsComp() {
  const navigate = useNavigate();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleProOnboardingClick = () => {
    navigate(`/${taal}/pro-onboarding`);
  };

  
  return (
    <main id="main">
      <section className="whyMostProsSectionHome">
        <img
          src={WhyMostProsImg}
          alt="Werkende vakspecialist bij een klus"
          className="whyMostProsSectionHomeImg"
        />
        <article className="whyMostProsTextContainerHome">
          <h2 className="howItWorksTitleHome">Waarom Mostpros?</h2>
          <p className="howitworkscardhomeP">
            MostPros is een All-in-1 Home Services App. Vind, huur, beheer en
            betaal gecertificeerde lokale vakspecialist als huiseigenaar voor al
            uw klussen. <br /> <br />
            Samen met ons groeiende netwerk bouwen we mee aan de huizen voor de
            toekomst. Samen helpen we mensen groeien. We accepteren de home
            service industrie niet zoals die is, samen willen we het veranderen
            terwijl we plezier hebben.
          </p>
          <article className="whyMostProsButtonContainer">
            <button
              className="whyMostProsButtonHome"
              onClick={handleScrollToTop}
            >
              Plaats je klus
            </button>
            <button
              className="whyMostProsButtonTwoHome"
              onClick={handleProOnboardingClick}
            >
              Inschrijven als vakman
            </button>
          </article>
        </article>
      </section>
      <section className="whyMostProsSectionHomeTwo">
        <img
          src={Allin1ServiceImg}
          alt="Werkende vakspecialist bij een klus"
          className="whyMostProsSectionHomeImg "
        />
        <article className="whyMostProsTextContainerHome">
          <h2 className="howItWorksTitleHome">All-in-1 Home Services App</h2>
          <p className="howitworkscardhomeP">
            Bespaar jezelf kosten en administratieve tijd met de All-in-1 Home
            Service App. Mostpros is je klus partner tijdens de levenscyclus van
            je huizenbezit.
            <br /> <br />
            Een gebruiksvriendelijke app met gecertificeerde lokale
            vakspecialisten om elke klus te voltooien.
          </p>
          <article className="whyMostProsButtonContainer">
            <img
              src={AppStore}
              alt="Appstore download"
              className="AppStoreHomeDownload"
            />
            <img
              src={PlayStore}
              alt="PlayStore download"
              className="PlayStoreHomeDownload"
            />
          </article>
        </article>
      </section>
      
      <section id="mainTwo">
        <div id="contentContainer">
          <article id="textImageWrapper">
            <p id="aboutusText">
              Mostpros is een alles-in-1 home service app. Vind, onderzoek en
              huur een gecertificeerde lokale vakspecialist als huiseigenaar
              voor al uw klussen.
            </p>
            <p id="aboutusText">
              Samen met ons groeiende netwerk bouwen we mee aan de huizen voor
              de toekomst. Samen helpen we mensen groeien. We accepteren de home
              service industrie niet zoals die is, samen willen we het
              veranderen terwijl we plezier hebben.
            </p>
          </article>
          <img
            src={groepsFoto}
            alt="groeps foto van de medewerkers Mostpros"
            id="groupImage"
          />
        </div>
      </section>
    </main>
  );
}

export default OverOnsComp;
