import Cal from "../../components/Agenda/Callendar";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./CalenderPage.css";

const CalenderPage = () => {
  return (
    <>
      <NavBar />
      <div className="calendar-panel">
        <div className="side-panel-left-calendar">
          <SideNav />
        </div>
        <Cal />
      </div>
      <Footer />
    </>
  );
};

export default CalenderPage;