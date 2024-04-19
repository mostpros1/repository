import "./MijnKlussenOverzichtComp.css";
import Icon from "../../assets/kraan.svg";
import Lisa from "../../assets/Lisa_V.png";


function MijnKlussenOverzichtComp() {
  return (
    <main id="MijnKlussenOverzichtMain">
      <section id="topButtonContainer">
        <a
          id="topButton"
          href=""
          rel="noopener noreferrer"
        >
          Terug naar start
        </a>
        <h2 id="pageTitle">Uw huidige klussen</h2>
      </section>

      <section id="smallSectionsContainer">
        <article id="whiteCardOne">
          <article id="cardTitleWrapper">
            <h4 id="cardTitle">Loodgieters werk: nieuwe leiding aanleggen</h4>
          </article>
          <h5>Beschrijving</h5>
          <h6>Opdrachtnummer: 234561</h6>
          <h6>Type Klus:</h6>
          <article className="jobCardDetail">
            <img src={Icon} alt="Klus Icon" className="klus-iconDetail" />
            <p className="jobCardText">Nieuwe leiding aanleggen</p>
          </article>
          <article id="marginBottom">
            <h6>Aanvullende Informatie:</h6>
            <p className="infoText">
              De leiding in de keuken, badkamer en in de tuin moeten aangelegd
              worden. Er is geen schade in de keuken en badkamer. Er is wel
              schade in de tuin waar de leiding momenteel is.
            </p>
          </article>
          <a href=""
            rel="noopener noreferrer" className="noDecoration"><p className="moreInfoName" id="moreInfoName">Klus bekijken</p></a>
        </article>
        <article id="whiteCardTwo">
          <div id="blueCircle"><p id="blueCirclePlus">+</p></div>
          <h5>Nieuwe klus zoeken</h5>
        </article>
        <article id="whiteCardOne">
          <article id="cardTitleWrapper">
            <h4 id="cardTitle">Geselecteerd Klussen</h4>
          </article>
          <article id="profileBeam">
            <div id="pfpNameWrapper">
              <img src={Lisa} id="pfpIcon" alt="" />
              <h5 id="pfpName">Lisa Zoetlief</h5>
            </div>
            <p id="profileBeamButton">Bekijken</p>
          </article>
          <article id="profileBeam">
            <div id="pfpNameWrapper">
              <img src={Lisa} id="pfpIcon" alt="" />
              <h5 id="pfpName">Lisa Zoetlief</h5>
            </div>
            <p id="profileBeamButton">Bekijken</p>
          </article>
          <article id="profileBeam">
            <div id="pfpNameWrapper">
              <img src={Lisa} id="pfpIcon" alt="" />
              <h5 id="pfpName">Lisa Zoetlief</h5>
            </div>
            <p id="profileBeamButton">Bekijken</p>
          </article>
          <article id="profileBeam">
            <div id="pfpNameWrapper">
              <img src={Lisa} id="pfpIcon" alt="" />
              <h5 id="pfpName">Lisa Zoetlief</h5>
            </div>
            <p id="profileBeamButton">Bekijken</p>
          </article>

        </article>
        <article id="whiteCardOne">
          <article id="cardTitleWrapper">
            <h4 id="cardTitle">Geïnteresseerd klanten</h4>
          </article>
          <article id="profileBeam">
            <div id="pfpNameWrapper">
              <img src={Lisa} id="pfpIcon" alt="" />
              <h5 id="pfpName">Lisa Zoetlief</h5>
            </div>
            <p id="profileBeamButton">Bekijken</p>
          </article>

        </article>

      </section>
    </main>
  );
}

export default MijnKlussenOverzichtComp;