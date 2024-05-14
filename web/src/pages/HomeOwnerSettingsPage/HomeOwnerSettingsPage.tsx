import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import Footer from "../../components/ui/Footer/Footer";
import HomeOwnerSettings from "../../components/HomeOwnerSettings/HomeOwnerSettings";
import "./HomeOwnerSettingsPage.css";

function HomeOwnerSettingsPage() {
  return (
    <div>
      <NavBar />
      <div id="flexbox-panel">
        <SideNav />
        <HomeOwnerSettings />
      </div>
      <Footer />
    </div>
  );
}

export default HomeOwnerSettingsPage;
