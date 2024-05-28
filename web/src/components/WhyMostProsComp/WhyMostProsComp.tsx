import "./WhyMostProsComp.css";
import thumbsupimg from "../../assets/thumbsupcheck.png";


function WhyMostProsComp() {
  return (
    <section className="mainSectionWhyMostPros">
      <article className="whymostprosleft">
        <section className="flexboxContainer">
          <h4 className="whymostprosh4">Waarom Mostpros en hoe we samen winnen</h4>
          <p className="whymostprosP">
            Een van de snelst verbeterende Alles-in-1 Home Services Apps. Vind, huur, beheer en betaald gecertificeerde lokale vakspecialisten. <br /><br />
            Missie: Versimpel de home service sector voor 10 miljoen mensen <br /><br /> Ons motto is elke dag 1% beter op het gebied van product ontwikkeling, integraties, veiligheid en intellectueel leiderschap. <br /><br />
            Mostpros is een onderneming die de manier waarop huiseigenaren hun huisonderhoud en verbouwingsprojecten beheren, revolutioneert. Als een innovatief platform verbindt Mostpros huiseigenaren
            met bekwame vakspecialisten, waardoor de drempel voor het vinden van de juiste vakmensen voor elke klus aanzienlijk wordt verlaagd.
          </p>
        </section>
        <article className="whymostprosBlueSquare">
          <p className="whymostprosPBlue">Begin binnen enkele minuten. Bespaar kosten met onze lage systeemkosten. Er zijn geen verborgen kosten of procentuele bezuinigingen. Bespaar administratieve tijd. Maak gebruik van onze wereldwijde betaalmethoden. Geniet van onze hartelijke, klantgerichte aanpak. Probeer het gratis uit.
          </p>
        </article>
      </article>
      <article className="whymostprosright">
        <img className="whymostprosrigthimg" src={thumbsupimg} alt="image of a character with a checklist doing a thumbsup" />
        <article className="smallcardsWhyMostProsContainer">
          <article className="smallcardsWhyMostPros"><p className="smallcardsWhyMostProsP">Goede klantervaring</p></article>
          <article className="smallcardsWhyMostPros"><p className="smallcardsWhyMostProsP">Toegang talentenpools</p></article>
          <article className="smallcardsWhyMostPros"><p className="smallcardsWhyMostProsP">Groeiend netwerk</p></article>
          <article className="smallcardsWhyMostPros"><p className="smallcardsWhyMostProsP">Open infrastructuur</p></article>
          <article className="smallcardsWhyMostPros"><p className="smallcardsWhyMostProsP">Automatiseer workflow</p></article>
          <article className="smallcardsWhyMostPros"><p className="smallcardsWhyMostProsP">500+ diensten</p></article>

        </article>
      </article>
    </section>
  );
}

export default WhyMostProsComp;
