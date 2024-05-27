import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import "./OverzichtProfPage.css";
import OverzichtProf from "../../components/Overzicht/OverzichtProf";

function SpecialistProfile() {
  return (
    <div id="root">
      <NavBar />
      <div id="main-content-specialist">
        <OverzichtProf />
      </div>
      <Footer />
    </div>
  );
}

export default SpecialistProfile;
