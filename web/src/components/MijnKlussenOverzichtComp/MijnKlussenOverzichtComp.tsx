import "./MijnKlussenOverzichtComp.css";

function MijnKlussenOverzichtComp() {
  return (
    <main>
      <section className="topButtonContainer">
        <a
          className="topButton"
          href=""
          rel="noopener noreferrer"
        >
          Terug naar start
        </a>
        <h2 className="pageTitle">Uw huidige klussen</h2>
      </section>

      <article className="whiteCardLeftWrapper">
          <h5>Beschrijving</h5>
          <h6>Opdrachtnummer: 234561</h6>
          <h6>Type Klus:</h6>
          <article className="jobCard">
            <img src={Icon} alt="Klus Icon" className="klus-icon" />
            <p className="jobCardText">Nieuwe leiding aanleggen</p>
          </article>
          <article>
            <h6>Aanvullende Informatie:</h6>
            <p className="infoText">
              De leiding in de keuken, badkamer en in de tuin moeten aangelegd
              worden. Er is geen schade in de keuken en badkamer. Er is wel
              schade in de tuin waar de leiding momenteel is.
            </p>
          </article>
        </article>
    </main>
  );
}

export default MijnKlussenOverzichtComp;
