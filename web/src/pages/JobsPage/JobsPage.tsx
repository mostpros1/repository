import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import Jobs from "../../components/JobsComp/Jobs";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./JobsPage.css";

const jobspage = () => {
  return (
    <div>
      <NavBar />
      <div className="side-panel">
        <div className="side-panel-right">
          <Jobs
            name={undefined}
            function={undefined}
            rating={undefined}
            reviews={undefined}
          />
          <div className="side-panel-left">
            <SideNav />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default jobspage;
