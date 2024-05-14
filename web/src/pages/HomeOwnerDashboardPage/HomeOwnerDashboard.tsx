import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import EditProfileSection from "../../components/EditProfile/EditProfileSection";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./HomeOwnerDashboard.css";

function HomeOwnerDashboard() {
  return (
    <div>
      <NavBar />
      <div id="flexbox-panel">
        <SideNav />
        <EditProfileSection />
      </div>
      <Footer />
    </div>
  );
}

export default HomeOwnerDashboard;
