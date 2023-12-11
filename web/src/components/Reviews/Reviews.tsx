import "./Reviews.css";

import handyman from "../../assets/handyman.png";
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
              <img src={handyman} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div>
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
              </div>
              <p className="review_title">Lekkage badkamer</p>
              <p className="review_name">Piet Beumers</p>
              <p className="review_comment">Dankjewel voor de goede service.</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={handyman} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div>
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={emptyStar} alt="" />
              </div>
              <p className="review_title">Tuinontwerp en aanleg</p>
              <p className="review_name">Robin Kikker</p>
              <p className="review_comment">Luistert goed naar mensen en tevreden met de uitvoering.</p>
            </div>
          </div>
          <div className="reviewCard">
            <div className="reviewImg_con">
              <img src={handyman} alt="" className="reviewImage" />
            </div>
            <div className="reviewContent_container">
              <div>
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={star} alt="" />
                <img className="review_star" src={emptyStar} alt="" />
                <img className="review_star" src={emptyStar} alt="" />
              </div>
              <p className="review_title">Nieuwe inloopdouche</p>
              <p className="review_name">Richard Mol</p>
              <p className="review_comment">Vakkundig aangepakt, duurde wel wat lang.</p>
            </div>
          </div>
        </div>
        <div className="button_container">
          <Link to="/klussen">
            <button className="button">Nieuwe klus plaatsen</button>
          </Link>
          
        </div>
      </div>
    </>
  );
}

export default Reviews;
