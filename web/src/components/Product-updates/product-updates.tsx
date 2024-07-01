import React, { useState, useEffect } from "react";
import "./product-updates.css";
import { XEmbed } from "react-social-media-embed";

function ProductUpdates() {
  const [currentSlide, setCurrentSlide] = useState(0); // State to manage current slide
  const [visibleSlides, setVisibleSlides] = useState([0, 1, 2]); // Slides to be shown initially
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(slideInterval); // Cleanup the interval on component unmount
  }, [currentSlide]);

  const handleError = () => {
    setEmbedError(true);
  };

  // Array of Twitter URLs
  const twitterUrls = [
    "https://twitter.com/mostpros/status/1805260568095318198",
    "https://twitter.com/mostpros/status/1796464177814581526",
    "https://x.com/mostpros/status/1795114389135052882",
    "https://x.com/mostpros/status/1793950134574981274",
    "https://x.com/mostpros/status/1788901572140740991",
    "https://x.com/mostpros/status/1786331156125831439",
    "https://x.com/mostpros/status/1786319613128585256",
    "https://x.com/mostpros/status/1784946455641235540",
    // Add more Twitter URLs here
  ];

  const nextSlide = () => {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= twitterUrls.length) {
      nextIndex = 0; // Loop back to the start
    }
    setCurrentSlide(nextIndex);
    setVisibleSlides((prevSlides) => {
      const currentIndex = prevSlides.indexOf(currentSlide);
      if (currentIndex === 0) {
        return [
          nextIndex,
          (nextIndex + 1) % twitterUrls.length,
          (nextIndex + 2) % twitterUrls.length,
        ];
      } else if (currentIndex === 1) {
        return [
          (nextIndex - 1 + twitterUrls.length) % twitterUrls.length,
          nextIndex,
          (nextIndex + 1) % twitterUrls.length,
        ];
      } else {
        return [
          (nextIndex - 2 + twitterUrls.length) % twitterUrls.length,
          (nextIndex - 1 + twitterUrls.length) % twitterUrls.length,
          nextIndex,
        ];
      }
    });
  };

  const prevSlide = () => {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = twitterUrls.length - 1; // Loop back to the end
    }
    setCurrentSlide(prevIndex);
    setVisibleSlides((prevSlides) => {
      const currentIndex = prevSlides.indexOf(currentSlide);
      if (currentIndex === 0) {
        return [
          (prevIndex + twitterUrls.length - 1) % twitterUrls.length,
          prevIndex,
          (prevIndex + 1) % twitterUrls.length,
        ];
      } else if (currentIndex === 1) {
        return [
          (prevIndex + 1) % twitterUrls.length,
          prevIndex,
          (prevIndex - 1 + twitterUrls.length) % twitterUrls.length,
        ];
      } else {
        return [
          prevIndex,
          (prevIndex + 1) % twitterUrls.length,
          (prevIndex + 2) % twitterUrls.length,
        ];
      }
    });
  };

  return (
    <div className="updates-container">
      <h2>Product Updates</h2>
      <p>{embedError && "An error occurred while loading the tweet."}</p>
      <div className="btnContainer">
        <button id="slideBtn" onClick={prevSlide}>
          ←
        </button>
        <button id="slideBtn" onClick={nextSlide}>
          →
        </button>
      </div>
      <div className="embed-container">
        {twitterUrls.map((url, index) => (
          <div
            key={index}
            style={{
              display: visibleSlides.includes(index) ? "block" : "none",
            }}
          >
            <XEmbed
              id={`twitterCard-${index}`}
              url={url}
              width={325}
              onError={handleError} // Optional: handle errors if needed
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductUpdates;
