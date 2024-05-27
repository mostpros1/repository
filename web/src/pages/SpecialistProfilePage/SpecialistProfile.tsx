import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import "./SpecialistProfile.css";
import SpecialistPage from "../Offertestraat-specialist/SpecialistPage";

function SpecialistProfile() {
  return (
    <div id="root">
      <NavBar />
      <div id="main-content-specialist">
        <SpecialistPage />
      </div>
      <Footer />
    </div>
  );
}

export default SpecialistProfile;
