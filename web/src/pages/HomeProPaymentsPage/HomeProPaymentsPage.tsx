import SideNav from "../../components/ui/SideNav/SideNav";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import HomeProPaymentsComp from "../../components/HomeProPaymentsComp/HomeProPaymentsComp";
import "./HomeProPaymentsPage.css";

function HomeProPaymentsPage() {
  return (
    <div>
      <NavBar />
      <div id="content">
        <SideNav />
        <HomeProPaymentsComp />
      </div>
      <Footer />
    </div>
  );
}

export default HomeProPaymentsPage;
