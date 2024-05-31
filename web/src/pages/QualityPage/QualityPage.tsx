import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import QualityRequirements from "../../components/Quality/quality";
import "./QualityPage.css";

function QualityPage() {
  return (
    <div id="root">
      <NavBar />
      <QualityRequirements />
      <Footer />
    </div>
  );
}

export default QualityPage;
