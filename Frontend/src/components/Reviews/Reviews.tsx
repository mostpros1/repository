import "./Reviews.css";

import handyman from "../../assets/handyman.png";
import star from "../../assets/icon _star 1_.png";
import emptyStar from "../../assets/icon _star 1_empty.png";

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
                <img className="review_star" src={emptyStar} alt="" />
              </div>
              <p className="review_title">Soort klus</p>
              <p className="review_name">Naam van vakspecialist</p>
              <p className="review_comment">comment</p>
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
              <p className="review_title">Soort klus</p>
              <p className="review_name">Naam van vakspecialist</p>
              <p className="review_comment">comment</p>
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
              <p className="review_title">Soort klus</p>
              <p className="review_name">Naam van vakspecialist</p>
              <p className="review_comment">comment</p>
            </div>
          </div>
        </div>
        <div className="button_container">
          <button className="button">Nieuwe klus plaatsen</button>
        </div>
      </div>
    </>
  );
}

export default Reviews;
