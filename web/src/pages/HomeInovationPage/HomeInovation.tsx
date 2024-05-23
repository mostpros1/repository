import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import HIL from "../../components/HomeInovationsLab/HIL";
import "./HomeInovation.css";

function HomeInovation() {
  return (
    <div>
      <NavBar />
        <HIL />
      <Footer />
    </div>
  );
}

export default HomeInovation;
