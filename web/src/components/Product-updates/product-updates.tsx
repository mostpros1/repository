import React from "react";
import "./product-updates.css";
import update from "../../assets/Update.jpeg";

function ProductUpdates() {
  const updates = [
    {
      id: 1,
      title: "Product Update 1",
      details: "Product update 1 details",
      img: update,
    },
    {
      id: 2,
      title: "Product Update 2",
      details: "Product update 2 details",
      img: update,
    },
    {
      id: 3,
      title: "Product Update 3",
      details: "Product update 3 details",
      img: update,
    },
    {
      id: 4,
      title: "Product Update 4",
      details: "Product update 4 details",
      img: update,
    },
    {
      id: 5,
      title: "Product Update 5",
      details: "Product update 5 details",
      img: update,
    },
    {
      id: 6,
      title: "Product Update 6",
      details: "Product update 6 details",
      img: update,
    },
  ];

  return (
    <main id="productMain">
      <section id="product-updatesSection">
        <div className="productUpdateUpper">
          <h1>Product Updates</h1>
          <p>Stay up-to-date with the latest product updates and releases.</p>
        </div>
        <div id="product-updates">
          {updates.map((update) => (
            <div key={update.id} className="productBody">
              <h2>{update.title}</h2>
              <img src={update.img} alt="Product Update" />
              <p>{update.details}</p>
              <a href="https://www.linkedin.com/company/mostpros/posts/?feedView=all">
                Learn more
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default ProductUpdates;
