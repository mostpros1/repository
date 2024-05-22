import ReactDOM from "react-dom";
import "./JobList.css";
import SideNav from "../ui/SideNav/SideNav";
import FilterBar from "../../components/FilterBar/FilterBar";
import JobCards from "./JobCards";
ReactDOM.render(<JobList />, document.getElementById("root"));



function JobList() {
  return (
    <main className="jobListMain">
      <section className="sideNavSection">
        <article className="sideNav">
          <SideNav />
        </article>
      </section>
      <section className="jobCardsSection">
        <FilterBar />
        
        <JobCards />
      </section>
    </main>
  );
}

export default JobList;
