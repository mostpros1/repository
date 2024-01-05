import "./Reviews.css";

import GardenDesigner from "../../assets/garden_designer_planning.png";
import BathroomSpecialistMale from "../../assets/experienced_bathroom_specialist_installing_fixtur_male.png";
import BathroomSpecialistFemale from "../../assets/experienced_bathroom_specialist_installing_fixtur_female.png";
import star from "../../assets/icon _star 1_.png";
import emptyStar from "../../assets/icon _star 1_empty.png";
import { Link } from "react-router-dom";

function Reviews() {
  return (
    <>
      <div className="review_con">
        <div className="title_container" id="title_container_blue">
          <h2>Reviews</h2>
        </div>
        <div className="reviewCard_con">
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={BathroomSpecialistFemale} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div>
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
              </div>
              <p className="review_title">Toiletrenovatie</p>
              <p className="review_name">Riek groen</p>
              <p className="review_comment">S.Beisterveld heeft ons jaren60toilet
                een moderne uitstraling gegeven.
                Twee oude tegellagen en een cement ondergrond moesten verwijderd worden en toen bleek dat de muren scheef stonden. Een nare tegenvaller met veel extra werk! Er kon pas getegeld worden na veel uitvlakwerk. Maar het resultaat mag er zijn . Superstrakke wanden en alle voegen lopen mooi in lijn. Het sanitair is vakkundig gemonteerd, we zijn heel blij met het resultaat!!</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={GardenDesigner} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div>
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={emptyStar} alt="" />
              </div>
              <p className="review_title">wij moesten een nieuwe stortbak</p>
              <p className="review_name">Willen Braakman</p>
              <p className="review_comment">wij moesten een nieuwe stortbak bij de wc en mk montage mocht de klus klaren en die heeft het heel netje er een nieuwe er in gezet volgen de keer weer mk montage</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={BathroomSpecialistMale} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div>
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={emptyStar} alt="" />
                <img className="review_star" src={emptyStar} alt="" />
              </div>
              <p className="review_title">Goede vakman</p>
              <p className="review_name">W.Zanting</p>
              <p className="review_comment">Goede vakman! De heer Zyulkyar van MM35 was zeer betrokken bij het oplossen van het lekkage-probleem. Zocht met mij naar de meest efficiënte oplossing en adviseerde ook hierbij. Zeer aan te bevelen!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reviews;
