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
      <div id="settings-panel">
        <div className="setting-side-panel-left">
          <SideNav />
        </div>
        <div className="setting-side-panel-right">
          <HomeOwnerSettings />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeOwnerSettingsPage;
