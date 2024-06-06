import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import HomeOwnerSettingsPageLayout from "./HomeOwnerSettingsPage-rt";
import "./HomeOwnerSettingsPage.css";

function HomeOwnerSettingsPage() {
  return (
    <div id="root">
      <NavBar />
      <HomeOwnerSettingsPageLayout />
      <Footer />
    </div>
  );
}

export default HomeOwnerSettingsPage;
