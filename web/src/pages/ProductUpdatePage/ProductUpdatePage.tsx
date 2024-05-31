import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import ProductUpdates from "../../components/Product-updates/product-updates";
import "./product-update.css";

function productUpdatePage() {
  return (
    <div id="root">
      <NavBar />
      <ProductUpdates />
      <Footer />
    </div>
  );
}

export default productUpdatePage;
