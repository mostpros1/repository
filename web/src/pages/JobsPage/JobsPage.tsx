import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import Jobs from "../../components/JobsComp/Jobs";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./JobsPage.css";

const jobspage = () => {
  return (
    <div>
      <NavBar />
      <div id="flexbox-panel">
        <SideNav />
        <Jobs />
      </div>
      <Footer />
    </div>
  );
};

export default jobspage;
