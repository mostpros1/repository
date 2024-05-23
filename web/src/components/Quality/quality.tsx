import React from "react";
import "./quality.css";
import qualitypic from "../../assets/QualityControl.svg";

const QualityRequirements = () => {
  return (
    <>
      <section id="quality-topSection">
        <section id="quality-leftSection">
          <div id="quality-reqboxtop">
            <h3>De huisregels van Mostpros</h3>
            <p>
              Vakmannen bij Mostpros hechten waarde aan hun werk en de band met
              hun klanten. Om te garanderen dat iedere vakman de gewenste
              service en kwaliteit levert, gaan ze akkoord met de huisregels van
              Mostpros.
            </p>
          </div>
          <div id="quality-reqboxbottom">
            <h3>De Kwaliteitseisen van Mostpros</h3>
            <p>
              Elke vakman die zich bij Mostpros aansluit, moet voldoen aan
              bepaalde kwaliteitseisen. Al onze vakmannen dienen bij het
              inschrijven een KvK-nummer invoeren.
            </p>
          </div>
        </section>
        <img id="quality-img" src={qualitypic} alt="Quality Control" />
      </section>
      <section id="quality-bottomSection">
        <h3 id="quality-bottomTitle">Stappenplan Huisregels</h3>
        <div id="quality-listcon">
          <ul>
            <li id="quality-list">
              <span id="quality-numberList">1</span>
              <div className="firstquality-tilesBox">
                <h3>
                  Behandel de klant met respect, zowel op het platform als
                  erbuiten
                </h3>
                <p>
                  Ruim na je werk op. Wees professioneel en respectvol. Vermijd
                  geweld. Mostpros herinnert klanten ook aan hun
                  verantwoordelijkheid.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">2</span>
              <div className="quality-tilesBox">
                <h3>Houd je aan afspraken met de klant.</h3>
                <p>Zorg ervoor dat je:</p>
                <li>
                  Aanwezig bent en op tijd komt bij het opnemen van een offerte
                </li>
                <li>Je levert de offerte op binnen de afgesproken termijn</li>
                <li>Aanwezig en op tijd bent bij het uitvoeren van de klus</li>
                <p>
                  Als ondernemer ben je vaak druk. Dat snappen we. Kun je een
                  afspraak niet nakomen? Laat dit dan tijdig weten, plan een
                  nieuwe afspraak en bied je excuses aan.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">3</span>
              <div className="quality-tilesBox">
                <h3>
                  Communiceer duidelijk met de klant over (extra) kosten,
                  wanneer je kan beginnen en hoe lang het werk duurt.
                </h3>
                <p>
                  Klanten zoeken duidelijkheid en zekerheid zonder verrassingen.
                  Jij bent de expert, dus communiceer duidelijk als er iets
                  verandert en geef vooraf aan wat ze kunnen verwachten.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">4</span>
              <div className="quality-tilesBox">
                <h3>Zorg voor professionele berichten.</h3>
                <p>
                  Klanten verwachten een professioneel bericht bij een grote
                  investering. Schrijf dus duidelijk en in begrijpelijk
                  Nederlands. Doe geen extreem lage biedingen en waarschuw niet
                  voor kosten aan jouw kant. Zorg dat je offertes helder zijn en
                  geef duidelijkheid over BTW en hoe er betaald kan worden.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">5</span>
              <div className="quality-tilesBox">
                <h3>
                  Lever goed werk, maak het werk af en los eventuele klachten
                  netjes op.
                </h3>
                <p>
                  Het belangrijkste is dat je kwalitatief goed werk levert. Neem
                  geen opdrachten aan die je niet aankunt. Rond je werk goed af
                  en laat klanten niet in de steek. Als er problemen zijn,
                  handel dan klachten netjes af. Als je er met de klant niet
                  uitkomt, neem dan contact met ons op voor advies.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">6</span>
              <div className="quality-tilesBox">
                <h3>Voorwaarden</h3>
                <p>
                  Als je ons platform gebruikt, ga je akkoord met de huisregels.
                  Bij klachten onderzoeken we de situatie. Afhankelijk van het
                  verleden van het bedrijf kunnen we waarschuwen of het bedrijf
                  van het platform verwijderen. Vragen? Mail ons op
                  info@mostpros.com.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default QualityRequirements;
