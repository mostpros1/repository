import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import "./OverzichtKlussenPage.css";
import OverzichtKlussen from "../../components/Overzicht/OverzichtJobs";

function SpecialistProfile() {
  return (
    <div id="root">
      <NavBar />
      <div id="main-content-specialist">
        <OverzichtKlussen />
      </div>
      <Footer />
    </div>
  );
}

export default SpecialistProfile;
