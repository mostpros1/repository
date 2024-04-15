import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import Jobs from "../../components/JobsComp/Jobs";
import SideNav from "../../components/ui/SideNav/SideNav";

const jobspage = () => {
  return (
    <div>
      <NavBar />
      <div className="side-panel">
        <Jobs
          name={undefined}
          function={undefined}
          rating={undefined}
          reviews={undefined}
        />
        <SideNav />
      </div>
      <Footer />
    </div>
  );
};

export default jobspage;
