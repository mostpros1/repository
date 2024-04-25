import React, { useState, useEffect } from "react";
import "./Review.css";
import SittingCustomer from "../../assets/SittingCustomer.png";
import { Star } from "@mui/icons-material";
import { dynamo } from "../../../declarations";

const Review = () => {
  const [reviews, setReviews] = useState<{ id: unknown; author: unknown; date: unknown; content: unknown; totalReviews: unknown; authorImageUrl: unknown; rating: unknown; }[]>([]);
  const [sortedReviews, setSortedReviews] = useState<{ id: unknown; author: unknown; date: unknown; content: unknown; totalReviews: unknown; authorImageUrl: unknown; rating: unknown; }[]>([]);
  const [sortType, setSortType] = useState<string>(""); // Example type for sortType (replace with appropriate type)


  // Sorting function
  const handleSort = (type) => {
    let sorted = [...reviews]; // Create a copy of reviews
    if (type === "date") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (type === "totalReviews") {
      sorted.sort((a, b) => b.totalReviews - a.totalReviews);
    }
    setSortedReviews([...sorted]); // Update sortedReviews state
    setSortType(type); // Update sortType state
  };

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await dynamo.scan({ TableName: "my-table" }).promise();
        if (response && response.Items) {
          const mappedReviews = response.Items.map(item => ({
            id: item.id,
            author: item.professional_id, // Assuming professional_id is the author
            date: item.date,
            content: item.description,
            totalReviews: item.totalReviews,
            authorImageUrl: item.authorImageUrl,
            rating: item.rating
          }));
          setReviews(mappedReviews); // Set reviews state
          setSortedReviews(mappedReviews); // Set sortedReviews state initially
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews(); // Call fetchReviews when component mounts
  }, []); // Empty dependency array ensures this runs only once after mount

  // Star rating component
  const StarRating = ({ rating }) => {
    return (
      <div className="star-rating">
        {Array.from({ length: 5 }, (_, index) => (
          <Star key={index} className={index < rating ? "filled" : ""} />
        ))}
      </div>
    );
  };

  // Review form component
  const ReviewForm = () => {
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const currentDate = new Date().toLocaleDateString();
      const newReview = {
        id: sortedReviews.length + 1,
        author: author,
        date: currentDate,
        content: content,
        totalReviews: 1,
        authorImageUrl: `https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`,
        rating: rating
      };

      setSortedReviews([...sortedReviews, newReview]); // Add new review to sortedReviews
      setAuthor("");
      setContent("");
      setRating(0);

      // Perform DynamoDB update or post request to add the new review
      try {
        // Example: await dynamo.put({...}).promise();
        console.log("Review submitted:", newReview);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    };

    return (
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Your name"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Your review"
          required
        />
        <StarRating rating={rating} />
        <button type="submit">Submit Review</button>
      </form>
    );
  };

  return (
    <div className="review-container">
      <div className="upper-review-con">
        <h1>Reviews</h1>
        <div>
          Sort by:
          <select onChange={(e) => handleSort(e.target.value)}>
            <option value="">Relevance</option>
            <option value="date">Date</option>
            <option value="totalReviews">Total Reviews</option>
          </select>
        </div>
        <p>Reviews are sourced from customers like you.</p>
        <div className="grid-sect">
          <ReviewForm />
          <img src={SittingCustomer} alt="sitting-customer" />
        </div>
      </div>
      <div className="reviews-list">
        {sortedReviews.map((review) => (
          <div key={review.id} className="review">
            <div className="review-header">
              <img src={review.authorImageUrl} alt={review.author} />
              <div>
                <div className="author-name">{review.author}</div>
                <div className="review-info">
                  <span className="total-reviews">
                    Total Reviews: {review.totalReviews}
                    <span className="review-date">{review.date}</span>
                  </span>
                  <div className="star-rating">
                    <StarRating rating={review.rating} />
                  </div>
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
