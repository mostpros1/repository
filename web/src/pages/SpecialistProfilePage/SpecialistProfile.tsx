import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import './SpecialistProfile.css';

function SpecialistProfile() {
  return (
    <div id="root">
      <NavBar />
      <div className="main-content">
        <SpecialistProfile />
      </div>
      <Footer />
    </div>
  );
}

export default SpecialistProfile;