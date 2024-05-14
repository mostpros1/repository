import NavBar from "../../components/ui/NavBar/NavBar";
import "./ResultsPage.css";
import JobList from "../../components/JobList/JobList";
import Footer from "../../components/ui/Footer/Footer";
import FilterBar from "../../components/FilterBar/FilterBar";
import SideNav from "../../components/ui/SideNav/SideNav";

function ResultsPage() {
  return (
    <>
      <NavBar />
      <div id="flexbox-panel">
        <SideNav />
        <div className="result-con">
          <FilterBar />
          <JobList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ResultsPage;
