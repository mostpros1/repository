import SideNav from "../../components/ui/SideNav/SideNav";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import JobsComp from "../../components/JobsComp/JobsComp";
import "./JobsPage.css";

function JobsPage() {
  return (
    <div>
      <NavBar />
      <div id="content">
        <SideNav />
        <JobsComp />
      </div>
      <Footer />
    </div>
  );
}

export default JobsPage;
