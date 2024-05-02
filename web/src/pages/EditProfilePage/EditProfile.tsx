import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import EditProfileSection from "../../components/EditProfile/EditProfileSection";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./EditProfile.css";

function EditProfile() {
  return (
    <div>
      <NavBar />
      <div id="profile-panel">
        <div id="side-panel-left-profile">
          <SideNav />
        </div>
        <div id="side-panel-right-profile">
          <EditProfileSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
