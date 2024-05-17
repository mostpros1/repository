import NavBar from "../../components/ui/NavBar/NavBar";
import "./ResultsPage.css";
import JobList from "../../components/JobList/JobList";
import Footer from "../../components/ui/Footer/Footer";
import FilterBar from "../../components/FilterBar/FilterBar";
import SideNav from "../../components/ui/SideNav/SideNav";

function ResultsPage() {
  return (
    <div id="root">
      <NavBar />
      <JobList />
      <Footer />
    </div>
  );
}

export default ResultsPage;
