import "./DetailJobComp.css";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "../../assets/kraan.svg";

function DetailJobComp() {
  return (
    <main className="detailJobMain">
      <section className="topButtonContainer">
        <a
          className="topButtonDetailJob"
          href=""
          rel="noopener noreferrer"
        >
          Terug naar klussen
        </a>
        <h2 className="pageTitle">Uw huidige klus: Loodgieter werk</h2>
      </section>
      <section className="whiteCard">
        <article className="cardTitleWrapper">
          <h4>Details van de klus</h4>
        </article>
        <article className="whiteCardLeftWrapper">
          <h5>Beschrijving</h5>
          <h6>Opdrachtnummer: 234561</h6>
          <h6>Type Klus:</h6>
          <article className="jobCardDetail">
            <img src={Icon} alt="Klus Icon" className="klus-iconDetail" />
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
        <article className="whiteCardRightWrapper">
          <article className="cardTitleWrapper">
            <h4>Datum uitvoering</h4>
          </article>
          <article className="dateCard">
            <h3 className="dateDay">4</h3>
            <p className="dateDetail">Oktober</p>
            <p className="dateDetail">2023</p>
          </article>

          <article className="iconInfoBox">
            <div className="divFlex">
              <EmailIcon style={{ fontSize: "2.4rem", color: "#308AE4" }} />
              <p className="dateDetail">Adres: iets straat 23</p>
            </div>
            <div className="divFlex">
              <HouseIcon style={{ fontSize: "2.5rem", color: "#308AE4" }} /> {/* Replace EmailIcon with HouseIcon */}
              <p className="dateDetail">Postcode: 1320 DP</p>
            </div>
            <div className="divFlex">
              <LocationOnIcon style={{ fontSize: "2.5rem", color: "#308AE4" }} /> {/* Replace EmailIcon with LocationOnIcon */}
              <p className="dateDetail">Locatie: Haarlem</p>
            </div>
          </article>
          <div className="moreInfoBox">
            <a href=""
              rel="noopener noreferrer" className="noDecoration">
              <p className="moreInfoName">Meer info</p>
            </a>
          </div>
        </article>
        <a href=""
          rel="noopener noreferrer" className="noDecoration"><p className="moreInfoName">Klus beëindigen</p></a>
      </section>
    </main>
  );
}

export default DetailJobComp;
