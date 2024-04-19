import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import Footer from "../../components/ui/Footer/Footer";
import "./MijnKlussen.css";
import JobDisc from "../../components/JobProfile/JobDisc";

function KlussenPage() {
  return (
    <div id="klussenpage">
      <NavBar />
      <div className="main-content">
        <SideNav />
        <JobDisc />
      </div>
      <Footer />
    </div>
  );
}

export default KlussenPage;
