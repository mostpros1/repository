import "./Reviews.css";
import * as React from "react";
import handyman from "../../assets/handyman.png";
import GardenDesigner from "../../assets/WillemBraakman_small.png";
import BathroomSpecialistMale from "../../assets/experienced_bathroom_specialist_installing_fixtur_male.png";
import BathroomSpecialistFemale from "../../assets/experienced_bathroom_specialist_installing_fixtur_female.png";
import star from "../../assets/icon _star 1_.png";
import emptyStar from "../../assets/icon _star 1_empty.png";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
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
              <img
                src={BathroomSpecialistFemale}
                alt=""
                className="reviewImage"
              />
            </div>
            <div className="reviewContent_container">
              <div className="review_star">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <p className="review_title">Toiletrenovatie</p>
              <p className="review_name">Riek groen</p>
              <p className="review_comment">
                Mevrouw Beisterveld heeft ons jaren '60 toilet een totale
                make-over gegeven. Terwijl we even pauze namen, merkten we op
                dat mevrouw geen enkel probleem had met enkele uitdagingen. Ze
                heeft alles perfect afgewerkt; de wanden zijn ook volledig
                verbeterd. Na al het harde werk namen we even de tijd om te
                ontspannen, en ze bleek niet alleen een expert te zijn in
                renovaties, maar ook in andere activiteiten. We zijn erg blij
                met het resultaat.
              </p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={GardenDesigner} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div className="review_star">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarBorderIcon />
              </div>
              <p className="review_title">wij moesten een nieuwe stortbak</p>
              <p className="review_name">Willen Braakman</p>
              <p className="review_comment">
                wij moesten een nieuwe stortbak bij de wc en mk montage mocht de
                klus klaren en die heeft het heel netje er een nieuwe er in
                gezet volgen de keer weer mk montage
              </p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img
                src={BathroomSpecialistMale}
                alt=""
                className="reviewImage"
              />
            </div>
            <div className="reviewContent_container">
              <div className="review_star">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarBorderIcon />
                <StarBorderIcon />
              </div>
              <p className="review_title">Goede vakman</p>
              <p className="review_name">W.Zanting</p>
              <p className="review_comment">
                Goede vakman! De heer Zyulkyar van MM35 was zeer betrokken bij
                het oplossen van het lekkage-probleem. Zocht met mij naar de
                meest efficiënte oplossing en adviseerde ook hierbij. Zeer aan
                te bevelen!
              </p>
            </div>
          </div>
        </div>
        <div className="button_container">
          <Link to="/klussen">
            <button className="button-task">Nieuwe klus plaatsen</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Reviews;
