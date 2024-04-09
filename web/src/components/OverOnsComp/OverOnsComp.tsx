import "./OverOnsComp.css";
import Banner from "../../assets/workbanner.png";
import groepsFoto from "../../assets/groepsFoto.jpg";

function OverOnsComp() {
  return (
    <main id="main">
      <section id="mainTwo">
        <article id="textWrapper">
          <h5 id="smallTitle">MostPros</h5>
          <h2 id="bigTitle">
            Mostpros is een community marktplaats voor huiseigenaren om een
            moderne lokale vakspecialist te vinden.
          </h2>
        </article>
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
