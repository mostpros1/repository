import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import "./VSDashboard.css";
import SpecialistDashboard from "../../components/SpecialistDashboard/SpecialistDashboard";

function VSDashboard() {
  return (
    <div id="root">
      <NavBar />
      <div className="main-content">
        <SpecialistDashboard />
      </div>
      <Footer />
    </div>
  );
}

export default VSDashboard;
