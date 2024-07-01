import React, { useState } from "react";
import "./product-updates.css";
import { XEmbed } from "react-social-media-embed";

function ProductUpdates() {
  const [embedError, setEmbedError] = useState(false);

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

  return (
    <div className="updates-container">
      <h2>Product Updates</h2>
      <div className="embed-container">
        {twitterUrls.map((url, index) => (
          <div key={index}>
            <XEmbed
              id="twitterCards"
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
