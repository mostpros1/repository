import "./Professionals.css";
import "../Reviews/Reviews.css";
import GardenDesigner from "../../assets/garden_designer_planning.png";
import BathroomSpecialistMale from "../../assets/experienced_bathroom_specialist_installing_fixtur_male.png";
import BathroomSpecialistFemale from "../../assets/experienced_bathroom_specialist_installing_fixtur_female.png";
import Rik from "../../assets/Rik_C.png";
import Lisa from "../../assets/Lisa_V.png";
import Bas from "../../assets/Bas_R.png";
import Tina from "../../assets/Tina.O.png";
import Sem from "../../assets/Sem_M.png";
import Robbert from "../../assets/Robbert.W.png";
import { Link } from "react-router-dom";

function Professionals() {
  return (
    <>
      <div className="review_con">
        <div className="title_container" id="title_container_blue">
          <h2>Uitgelichte vakspecialisten</h2>
        </div>
        <div className="reviewCard_con">
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={Robbert} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <p className="review_title">Loodgieter</p>
              <p className="review_name">Robbert W.</p>
              <p className="prof_price">Sanitair/ lekkages €65/uur incl. btw</p>
              <p className="prof_price">Radiator vervangen €69/uur incl. btw</p>
              <p className="prof_price">Cv-montage €78/uur incl. btw</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={Sem} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <p className="review_title">Verhuizer</p>
              <p className="review_name">Sem M.</p>
              <p className="prof_price">Verhuizen €45/uur incl. btw</p>
              <p className="prof_price">Meubelmontage €49/uur incl. btw</p>
              <p className="prof_price">
                Reparatie/ onderhoud €57/uur incl. btw
              </p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={Tina} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <p className="review_title">Hovenier</p>
              <p className="review_name">Tina O.</p>
              <p className="prof_price">Tuinontwerp €75/uur incl. btw</p>
              <p className="prof_price">Tuinaanleg €64/uur incl. btw</p>
              <p className="prof_price">Tuinonderhoud €55/uur incl. btw</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={Bas} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <p className="review_title">Timmerman</p>
              <p className="review_name">Bas R.</p>
              <p className="prof_price">
                Tuinhuis/blokschuur/kapschuur €53/uur incl. btw
              </p>
              <p className="prof_price">
                Overkapping/pergola/carport €53/uur incl. btw
              </p>
              <p className="prof_price">Poolhouse/veranda €53/uur incl. btw</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={Rik} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <p className="review_title">Tuintechnicus</p>
              <p className="review_name">Rik C.</p>
              <p className="prof_price">Tuinberegening €78/uur incl. btw</p>
              <p className="prof_price">Robotmaaier €73/uur incl. btw</p>
              <p className="prof_price">Vijvertechniek €78/uur incl. btw</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={Lisa} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <p className="review_title">Schoonmaker</p>
              <p className="review_name">Lisa V.</p>
              <p className="prof_price">Schoonmaak €29/uur incl. btw</p>
              <p className="prof_price">Opruimen €29/uur incl. btw</p>
              <p className="prof_price">Wassen €29/uur incl. btw</p>
            </div>
          </div>
        </div>
        <div className="button_container">
          <Link to="/nl/jobs">
            <button className="button-professional">Nieuwe klus plaatsen</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Professionals;
