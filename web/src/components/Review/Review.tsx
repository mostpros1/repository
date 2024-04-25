import React, { useState, useEffect } from "react";
import "./Review.css";
import SittingCustomer from "../../assets/SittingCustomer.png";
import { Star } from "@mui/icons-material";
import { dynamo } from "../../../declarations";

const reviews = [
  {
    id: 1,
    author: "Toos Huisman",
    date: "11-10-2024",
    content:
      "Snelle reactie, met spoed zelfs komen kijken/helpen! Vriendelijke en duidelijke mensen.",
    totalReviews: 20,
    authorImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
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
    rating: 5,
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
    rating: 4,
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
    rating: 2,
    // ... add any other necessary fields
  },
  // ... add more review objects
];




const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [sortedReviews, setSortedReviews] = useState([]);
  const [sortType, setSortType] = useState("");

  // Sorting function
  const handleSort = (type) => {
    let sorted = [...reviews];
    if (type === "date") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (type === "totalReviews") {
      sorted.sort((a, b) => b.totalReviews - a.totalReviews);
    }
    setSortedReviews(sorted);
    setSortType(type);
  };

  useEffect(() => {
    function getReviews() {
      dynamo.scan({ TableName: "my-table" })
        .promise()
        .then(data => {
          if (data.Items) {
            const mappedArray = data.Items.map(item => ({
              id: item.id,
              professional_id: item.professional_id,
              rating: item.rating,
              description: item.description
            }));
            setReviews(mappedArray as never[]);
            // Initially set sortedReviews to the same as reviews
            setSortedReviews(mappedArray as never[]);
          }
        })
        .catch(console.error);
    }

    getReviews();
  }, []);

  //Star rating component
  const StarRating = ({ rating, setRating, interactive = false }) => {
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={`${index < rating ? "star filled" : "star"} ${interactive ? "interactive-star" : ""
              }`}
            onClick={() => interactive && setRating(index + 1)}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  //Review form component
  const ReviewForm = () => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitting with rating:", rating); // This will confirm the final rating being submitted
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;

      const newReview = {
        id: sortedReviews.length + 1,
        author: name,
        date: formattedDate,
        content: content,
        totalReviews: 1,
        authorImageUrl: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 100
        )}.jpg`,
        rating: rating,
      };
      setSortedReviews((prevReviews) => [...prevReviews, newReview]);
      setName("");
      setContent("");
      setRating(0);
    };

    return (
      <form id="review-main" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your review"
          required
        />
        <StarRating rating={rating} setRating={setRating} interactive={true} />
        <button type="submit">Submit Review</button>
      </form>
    );
  };

  return (
    <div>
      <div className="upper-review-con">
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
          De recensies op MostPros zijn afkomstig van huiseigenaren net zoals
          jij.
        </p>
        <div className="grid-sect">
          <ReviewForm />
          <img src={SittingCustomer} alt="sitting-customer" />
        </div>
      </div>
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
                      <StarRating
                        rating={review.rating}
                        interactive={false}
                        setRating={undefined}
                      />
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
