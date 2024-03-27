import "./JobDisc.css";
import Icon from "../../assets/kraan.svg";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

const JobDisc = () => {
  return (
    <div className="job_disc_card">
      <div className="job_disc_header">
        <button className="btn-secondary" onClick={() => history.back()}>
          Terug naar start
        </button>
      </div>
      <div className="job_disc_con">
        <div className="JobDiscTitle">
          <h3>Loodgieters werk: nieuwe leiding aanleggen</h3>
        </div>

        <div className="JobDiscContent">
          <div className="left-grid">
            <h4>Beschrijving</h4>
            <h5>Opdrachtgever:</h5>
            <p>Lisa Zoetlief</p>
            <h5>Type klus</h5>
            <img className="kraan" src={Icon} alt="icon" />
            <div className="job_disc_info">
              <h5>Aanvullende informatie</h5>
              <p>
                De leiding in de keuken, badkamer en in de tuin moeten aangelegd
                worden. Er is geen schade in de keuken en badkamer. Er is wel
                schade in de tuin waar de leiding momenteel is.
              </p>
            </div>
          </div>
          <div className="middle-grid">
            <div className="job_disc-details">
              <h4>
                <div className="location-icon">
                  <FmdGoodIcon />
                </div>
                locatie
              </h4>
              <h4>
                <div className="calendar-icon">
                  <DateRangeRoundedIcon />
                </div>
                Binnen twee weken
              </h4>
              <h4>
                <div className="location-icon">
                  <FmdGoodIcon />
                </div>
                1.1 KM van u locatie
              </h4>
            </div>
          </div>
          <div className="right-grid">
            <div className="info-card">
              <h4>Contact informatie</h4>
              <ul>
                <li>
                  <div className="phone-icon">
                    <PhoneInTalkIcon />
                  </div>
                  +31 0698765432
                </li>
                <li>
                  <div className="email-sect">
                    <EmailRoundedIcon />
                    Lisazoetlief@hotmail.com
                  </div>
                </li>
              </ul>
              <div className="btn-con">
                <button className="btn-secondary">
                  <ForumRoundedIcon />
                  Bericht sturen
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="btn">
          <button className="btn-primary">Klus oppakken</button>
        </div>
      </div>
    </div>
  );
};
export default JobDisc;
