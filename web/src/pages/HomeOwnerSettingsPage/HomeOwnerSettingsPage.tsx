import React from "react";
import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import Footer from "../../components/ui/Footer/Footer";
import HomeOwnerSettings from "../../components/HomeOwnerSettings/HomeOwnerSettings";
import HomeOwnerNotification from "../../components/HomeOwnerSettings/HomeOwnerNotification";
import HomeOwnerSecurity from "../../components/HomeOwnerSettings/HomeOwnerSecurity";
import HomeOwnerDeactivation from "../../components/HomeOwnerSettings/HomeOwnerDeactivation";
import "./HomeOwnerSettingsPage.css";

function HomeOwnerSettingsPage() {
  return (
    <div>
      <NavBar />
      <div id="main-center">
        <div id="main-con">
          <div id="sidebar-con">
            <div className="settings-upper">
              <h3>Account Settingen</h3>
              <p>Verander hier je account gegevens</p>
            </div>
            <div className="navbar-con">
              <SideNav />
            </div>
          </div>
          <div id="content-con">
            <section id="settings-con">
              <HomeOwnerSettings />
            </section>
            <section id="notification-con">
              <HomeOwnerNotification />
            </section>
            <section id="security-con">
              <HomeOwnerSecurity />
            </section>
            <section id="deactivation-con">
              <HomeOwnerDeactivation />
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomeOwnerSettingsPage;
