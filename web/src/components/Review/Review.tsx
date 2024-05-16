import React, { useState, useEffect } from "react";
import "./Review.css";
import SittingCustomer from "../../assets/SittingCustomer.png";
import { Star } from "@mui/icons-material";
import { dynamo } from "../../../declarations";
import { Auth } from "aws-amplify";

// Define a specific type for review objects
interface Review {
  id: number;
  author: string;
  homeownerName: string;
  date: string;
  content: string;
  authorImageUrl: string;
  rating: number;
}

const ReviewComponent: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [sortType, setSortType] = useState<string>("");

  // Sorting function
  const handleSort = (type: string) => {
    const sorted: Review[] = [...reviews]; // Create a copy of reviews
    if (type === "date") {
      sorted.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } /*else if (type === "totalReviews") {
      sorted.sort((a, b) => b.totalReviews - a.totalReviews);
    }*/
    setSortedReviews([...sorted]); // Update sortedReviews state
    setSortType(type); // Update sortType state
  };

  // Declare the fetchReviews function outside of useEffect
  async function fetchReviews() {
    try {
      const response = await dynamo.scan({ TableName: "Reviews" }).promise();
      if (response && response.Items) {
        const mappedReviews: Review[] = response.Items.map((item) => ({
          id: item.id,
          author: item.professional_name,
          homeownerName: item.homeownerName,
          date: item.date,
          content: item.description,
          //totalReviews: item.totalReviews,
          authorImageUrl: `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 100
          )}.jpg`, //item.authorImageUrl,
          rating: item.rating,
        }));
        setReviews(mappedReviews);
        setSortedReviews(mappedReviews);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  }

  // Call fetchReviews from within useEffect
  useEffect(() => {
    fetchReviews();
  }, []);


  // Star rating component
  const StarRating: React.FC<{ rating: number, onRatingChange?: (rating: number) => void }> = ({ rating, onRatingChange }) => {
    return (
      <div style={{ display: 'inline-flex', cursor: 'pointer' }}>
        {Array.from({ length: 5 }, (_, index) => (
          <Star
            key={index}
            onClick={() => onRatingChange && onRatingChange(index + 1)}
            style={{
              color: index < rating ? '#ffc107' : '#ccc', // Gold for filled, gray for unfilled
              transition: 'color 0.3s', // Smooth transition for color change
              fontSize: '2rem' // Larger size for better visibility
            }}
          />
        ))}
      </div>
    );
  };

  // Review form component
  const ReviewForm: React.FC = () => {
    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);


    async function getUUID() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const email = user.attributes.email;

        const data = await dynamo.query({
          TableName: "Uuids",
          IndexName: "emailIndex",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": email,
          },
        }).promise();

        if (data.Items && data.Items.length > 0) {
          return data.Items[0].uuid;
        } else {
          return user.attributes.name;
          //throw new Error("No items found");
        }
      } catch (error) {
        console.error("Error getting UUID:", error);
      }
    }

      const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const currentDate = new Date().toLocaleDateString();
        const newReview: Review = {
          id: sortedReviews.length + 1,
          author: name,
          date: currentDate,
          content: content,
          //totalReviews: 1,
          authorImageUrl: `https://randomuser.me/api/portraits/men/${Math.floor(
            Math.random() * 100
          )}.jpg`,
          rating: rating,
          homeownerName: "",
        };

        setSortedReviews([...sortedReviews, newReview]); // Add new review to sortedReviews
        setName("");
        setContent("");
        setRating(0);

        // Perform DynamoDB update or post request to add the new review
        try {
          const uuid = await getUUID(); // Wait for the UUID to be resolved
          await dynamo.put({
            TableName: "Reviews",
            Item: {
              id: Math.floor(Math.random() * 1000),
              professional_name: name,
              homeownerName: uuid, // Use the resolved UUID here
              date: newReview.date,
              description: newReview.content,
              //totalReviews: newReview.totalReviews,
              rating: String(newReview.rating),
            },
          }).promise();
          console.log("Review submitted:", newReview);
          fetchReviews();
        } catch (error) {
          console.error("Error submitting review:", error);
        }
      };

      return (
        <form id="review-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Specialist name"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Your review"
            required
          />
          <StarRating rating={rating} onRatingChange={setRating} />
          <button type="submit">Submit Review</button>
        </form>
      );
    };

    return (
      <section>
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
        <article className="reviews-container">
          {sortedReviews.map((review) => (
            <section key={review.id} className="review">
              <section className="review-header">
                <img src={review.authorImageUrl} alt={review.author} />
                <section>
                  <div className="author-name">{review.homeownerName}</div>
                  <article className="review-info">
                    <span className="total-reviews">
                      Specialist: {review.author}
                      <span className="review-date">{review.date}</span>
                    </span>
                    <article className="star-rating">
                      <StarRating rating={review.rating} />
                    </article>
                  </article>
                </section>
              </section>
              <article className="review-body">
                <p>{review.content}</p>
              </article>
              <article className="review-footer">
                <article className="review-actions">
                  <button>Public Comment.</button>
                  <button>Direct Message.</button>
                </article>
              </article>
            </section>
          ))}
        </article>
      </section>
    );
  };

  export default ReviewComponent;
