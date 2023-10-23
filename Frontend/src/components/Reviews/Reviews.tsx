import './Reviews.css'

import handyman from "../../assets/handyman.png"
import star from "../../assets/icon _star 1_.png"
import emptyStar from "../../assets/icon _star 1_empty.png"

function Reviews() {
    return (
        <>
            <div className="title_container" id="title_container_blue">
                <h2>Reviews</h2>
            </div>
            <div className="review_container">
                <div className="review">
                    <img src={handyman} alt="" className="reviewImage" />
                    <div className="reviewContent_container">
                        <div>
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={emptyStar} alt="" />
                        </div>
                        <p>Soort klus</p>
                        <p>Naam van vakspecialist</p>
                        <p>comment</p>
                    </div>
                </div>
                <div className="review">
                    <img src={handyman} alt="" className="reviewImage" />
                    <div className="reviewContent_container">
                        <div>
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={emptyStar} alt="" />
                        </div>
                        <p>Soort klus</p>
                        <p>Naam van vakspecialist</p>
                        <p>comment</p>
                    </div>
                </div>
                <div className="review">
                    <img src={handyman} alt="" className="reviewImage" />
                    <div className="reviewContent_container">
                        <div>
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={star} alt="" />
                            <img src={emptyStar} alt="" />
                        </div>
                        <p>Soort klus</p>
                        <p>Naam van vakspecialist</p>
                        <p>comment</p>
                    </div>
                </div>
            </div>
            <div className="button_container">
                <button className="button">Nieuwe klus plaatsen</button>
            </div>
        </>
    )
}

export default Reviews