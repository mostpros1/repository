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
              Vakspecialisten bij Mostpros hechten waarde aan professionaliteit. Als zij van dit platform gebruik willen maken dienen zij akkoord te gaan met de huisregels van Mostpros. Hiermee garanderen wij de beste service voor huiseigenaren.
            </p>
          </div>
          <div id="quality-reqboxbottom">
            <h3>De kwaliteitseisen van Mostpros</h3>
            <p>
              Om de kwaliteitseisen te waarborgen dient elke vakspecialist die van Mostpros gebruik maakt verplicht een KvK-nummer door te geven. Klanten verwachten een professioneel bericht bij een grote investering. Schrijf dus duidelijk en in begrijpelijk Nederlands. Doe geen extreem lage biedingen en waarschuw niet voor kosten aan jouw kant. Zorg dat je offertes helder zijn en geef duidelijkheid over BTW en hoe er betaald kan worden.
            </p>
          </div>
        </section>
        <img id="quality-img" src={qualitypic} alt="Quality Control"/>
      </section>
      <section id="quality-bottomSection">
        <h3 id="quality-bottomTitle">Stappenplan Huisregels</h3>
        <div id="quality-listcon">
          <ul>
            <li id="quality-list">
              <span id="quality-numberList">1</span>
              <div className="firstquality-tilesBox">
                <h3>
                  Wees professioneel en integer
                </h3>
                <p>
                  Elke vakspecialist dient op een professionele manier om te gaan met een huiseigenaar, zowel op het platform als daarbuiten. Mostpros verwacht hetzelde van de huiseigenaar. Schrijf in begrijpbaar Nederlands, doe geen lage biedingen en zorg dat jouw offertes duidelijk zijn.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">2</span>
              <div className="quality-tilesBox">
                <h3>Houd je aan gemaakte afspraken</h3>
                <p>Bij Mostpros gaat kwaliteit boven kwantiteit. Maak geen afspraken die je niet na kunt komen, neem dus ook geen klussen aan die je niet uit kunt voeren.</p>

                <p>
                  Zorg ervoor dat op tijd op locatie bent bij de huiseigenaar, je de offerte binnen de afgesproken termijn oplevert en de klus binnen de afgesproken periode uitvoert. Mocht je een gemaakte afspraak niet na kunnen komen, dan dien je dit tijdig te melden bij de huiseigenaar.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">3</span>
              <div className="quality-tilesBox">
                <h3>
                  Wees duidelijk over de kosten
                </h3>
                <p>
                  Huiseigenaren verwachten duidelijkheid over de kosten, communiceer dus met de klant over wat ze kunnen verwachten. Mochten er extra kosten in rekening komen laat dit dan tijdig weten aan de huiseigenaar.
                </p>
              </div>
            </li>
            <li id="quality-list">
              <span id="quality-numberList">4</span>
              <div className="quality-tilesBox">
                <h3>
                  Verdere informatie en klachten
                </h3>
                <p>
                Door ons platform te gebruiken, stem je in met onze huisregels. Bij klachten onderzoeken we de situatie. Afhankelijk van de geschiedenis van het bedrijf kunnen we een waarschuwing geven of het bedrijf van het platform verwijderen. Mochten er nog verdere onduidelijkheden zijn of wil je een klacht indienen? Mail dan naar teammostpros@gmail.com</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default QualityRequirements;
