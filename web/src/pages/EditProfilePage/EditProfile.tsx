import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import EditProfileSection from "../../components/EditProfile/EditProfileSection";
import "./EditProfile.css";

function EditProfile() {
  return (
    <div>
      <NavBar />
      <div className="main-content">
        <EditProfileSection />
      </div>
      <Footer />
    </div>
  );
}

export default EditProfile;
