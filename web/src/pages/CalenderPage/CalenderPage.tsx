import Callendar from "../../components/Agenda/Callendar";
import NavBar from '../../components/ui/NavBar/NavBar';
import Footer from '../../components/ui/Footer/Footer';
import "./CalenderPage.css";

const CalenderPage = () => {
  return (
    <div id="root">
      <NavBar />
      <Callendar />
      <Footer />
    </div>
  );
};

export default CalenderPage;