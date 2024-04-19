import React, { useState } from "react";
import "./Review.css";

const reviews = [
  {
    id: 1,
    author: "Toos Huisman",
    date: "11-10-2024",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 20,
    authorImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    // ... add any other necessary fields
  },
  {
    id: 2,
    author: "Mitchell Rhodes",
    date: "04-12-2024",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 100,
    authorImageUrl: "https://randomuser.me/api/portraits/men/4.jpg",
    // ... add any other necessary fields
  },
  {
    id: 3,
    author: "Regina Abdullah",
    date: "08-11-2024",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 4,
    authorImageUrl: "https://randomuser.me/api/portraits/men/6.jpg",
    // ... add any other necessary fields
  },
  {
    id: 4,
    author: "Andrew Rahman",
    date: "24-11-2024",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 14,
    authorImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    // ... add any other necessary fields
  },
  // ... add more review objects
];

const Review = () => {
  const [sortedReviews, setSortedReviews] = useState(reviews);
  const [sortType, setSortType] = useState("");

  // Sorting function
  const handleSort = (type) => {
    let sorted = [...reviews];
    if (type === "date") {
      sorted = sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } else if (type === "totalReviews") {
      sorted = sorted.sort((a, b) => b.totalReviews - a.totalReviews);
    }
    setSortedReviews(sorted);
    setSortType(type);
  };

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

  return (
    <div>
      <h1>Reviews</h1>
      <div>
        Sort by:
        <select onChange={(e) => handleSort(e.target.value)}>
          <option value="">Relevante</option>
          <option value="date">Date</option>
          <option value="totalReviews">Total Reviews</option>
        </select>
      </div>
      <p>
        De recensies op MostPros zijn afkomstig van huiseigenaren net zoals jij.
      </p>
      <div className="reviews-container">
        {sortedReviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <img src={review.authorImageUrl} alt={review.author} />
              <div>
                <div className="author-name">{review.author}</div>
                <div className="review-info">
                  <span className="total-spend">Loodgieter</span>
                  <span className="total-reviews">
                    Total Reviews: {review.totalReviews}
                    <span className="review-date">{review.date}</span>
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
