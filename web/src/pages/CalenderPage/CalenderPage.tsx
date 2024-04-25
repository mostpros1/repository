import Calender from "../../components/SpecialistMultistep/Calendar";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./CalenderPage.css";

const CalenderPage = () => {
  return (
    <>
      <NavBar />
      <div className="calendar-grid-con">
        <div className="calendar-sidenav-con">
          <SideNav />
        </div>
        <Calender />
      </div>
      <Footer />
    </>
  );
};

export default CalenderPage;
