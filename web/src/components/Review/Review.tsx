import React from "react";
import "./Review.css";

const reviews = [
  {
    id: 1,
    author: "Towhidur Rahman",
    date: "24-10-2022",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 14,
    authorImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    // ... add any other necessary fields
  },
  {
    id: 1,
    author: "Towhidur Rahman",
    date: "24-10-2022",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 14,
    authorImageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    // ... add any other necessary fields
  },
  {
    id: 1,
    author: "Towhidur Rahman",
    date: "24-10-2022",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 14,
    authorImageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    // ... add any other necessary fields
  },
  {
    id: 1,
    author: "Towhidur Rahman",
    date: "24-10-2022",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 14,
    authorImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    // ... add any other necessary fields
  },
  // ... add more review objects
];

const StarRating = ({ rating }) => {
  // Create an array of 5 elements, to render 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => {
    return (
      <span key={index} className={index < rating ? "star filled" : "star"}>
        ★
      </span>
    );
  });

  return <div className="star-rating">{stars}</div>;
};

const Review = () => {
  return (
    <div>
      <h1>Reviews</h1>
      <p>
        De recensies op MostPros zijn afkomstig van huiseigenaren net zoals
        jij.
      </p>
      <div className="reviews-container">
        {reviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <img src={review.authorImageUrl} alt={review.author} />
              <div>
                <div className="author-name">{review.author}</div>
                <div className="review-info">
                  <span className="total-spend">Loodgieter</span>
                  <span className="total-reviews">
                    Total Reviews: {review.totalReviews}
                    <div id="star-rating">
                      <StarRating rating={4} />
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="review-body">
              <p>{review.content}</p>
            </div>
            <div className="review-footer">
              <div className="review-actions">
                <></>
                <button>Public Comment</button>
                <button>Direct Message</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;
