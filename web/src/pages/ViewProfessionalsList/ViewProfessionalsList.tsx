import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import ViewProfessionals from "../../components/ViewProfessionals/ViewProfessionals";
import "./ViewProfessionalsList.css";

function ViewProfessionalsList() {
  return (
    <div>
      <NavBar />
      <div id="sidenav-prof">
        <SideNav />
        <ViewProfessionals />
      </div>
      <Footer />
    </div>
  );
}

export default ViewProfessionalsList;
