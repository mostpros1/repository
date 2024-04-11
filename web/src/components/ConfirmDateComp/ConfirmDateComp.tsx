import "./ConfirmDateComp.css";
import EmailIcon from "@mui/icons-material/Email";
import HouseIcon from "@mui/icons-material/House";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Icon from "../../assets/kraan.svg";


function ConfirmDateComp() {
  return (
    <main id="mainConfirmDate">
      <section id="topButtonContainerConfirmDate">
        <a
          className="topButtonDetailJobDetailJob"
          href=""
          rel="noopener noreferrer"
        >
          Terug naar klussen
        </a>
      </section>
      <section className="whiteCardDetailJob">
        <article className="cardTitleWrapperDetailJob">
          <h4>Details van de klus</h4>
        </article>
        <p id="infoCardConfirmDate">Lisa Zoetlief heeft op 30 September de volgende datum in uw kalender gereserveerd: 4 Oktober 2023. Indien deze datum niet mogelijk is wijzig deze hier beneden.</p>
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
              <p className="moreInfoNameDetailJob">Wijzig Datum</p>
            </a>
          </div>
        </article>
        <div className="buttonContainerConfirmDate">
          <button id="buttonConfirmDate">Datum Bevestigen</button>
        </div>
      </section>
    </main>
  );
}

export default ConfirmDateComp;
