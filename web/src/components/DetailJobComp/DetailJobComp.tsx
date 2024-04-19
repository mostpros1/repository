import "./DetailJobComp.css";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "../../assets/kraan.svg";

function DetailJobComp() {
  return (
    <main className="detailJobMainDetailJob">
      <section className="topButtonContainerDetailJob">
        <a
          className="topButtonDetailJobDetailJob"
          href=""
          rel="noopener noreferrer"
        >
          Terug naar klussen
        </a>
        <h2 className="pageTitleDetailJob">Uw huidige klus: Loodgieter werk</h2>
      </section>
      <section className="whiteCardDetailJob">
        <article className="cardTitleWrapperDetailJob">
          <h4>Details van de klus</h4>
        </article>
        <article className="whiteCardLeftWrapperDetailJob">
          <h5>Beschrijving</h5>
          <h6>Opdrachtnummer: 234561</h6>
          <h6>Type Klus:</h6>
          <article className="jobCardDetailDetailJob">
            <img src={Icon} alt="Klus Icon" className="klus-iconDetailDetailJob" />
            <p className="jobCardTextDetailJob">Nieuwe leiding aanleggen</p>
          </article>
          <article>
            <h6>Aanvullende Informatie:</h6>
            <p className="infoTextDetailJob">
              De leiding in de keuken, badkamer en in de tuin moeten aangelegd
              worden. Er is geen schade in de keuken en badkamer. Er is wel
              schade in de tuin waar de leiding momenteel is.
            </p>
          </article>
        </article>
        <article className="whiteCardRightWrapperDetailJob">
          <article className="cardTitleWrapperDetailJob">
            <h4>Datum uitvoering</h4>
          </article>
          <article className="dateCardDetailJob">
            <h3 className="dateDayDetailJob">4</h3>
            <p className="dateDetailDetailJob">Oktober</p>
            <p className="dateDetailDetailJob">2023</p>
          </article>

          <article className="iconInfoBoxDetailJob">
            <div className="divFlexDetailJob">
              <EmailIcon style={{ fontSize: "2.4rem", color: "#308AE4" }} />
              <p className="dateDetailDetailJob">Adres: iets straat 23</p>
            </div>
            <div className="divFlexDetailJob">
              <HouseIcon style={{ fontSize: "2.5rem", color: "#308AE4" }} /> {/* Replace EmailIcon with HouseIcon */}
              <p className="dateDetailDetailJob">Postcode: 1320 DP</p>
            </div>
            <div className="divFlexDetailJob">
              <LocationOnIcon style={{ fontSize: "2.5rem", color: "#308AE4" }} /> {/* Replace EmailIcon with LocationOnIcon */}
              <p className="dateDetailDetailJob">Locatie: Haarlem</p>
            </div>
          </article>
          <div className="moreInfoBoxDetailJob">
            <a href=""
              rel="noopener noreferrer" className="noDecorationDetailJob">
              <p className="moreInfoNameDetailJob">Meer info</p>
            </a>
          </div>
        </article>
        <a href=""
          rel="noopener noreferrer" className="noDecorationDetailJob"><p className="moreInfoNameDetailJob">Klus beëindigen</p></a>
      </section>
    </main>
  );
}

export default DetailJobComp;
