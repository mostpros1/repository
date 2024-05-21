import "./JobList.css";
import SideNav from "../ui/SideNav/SideNav";
import FilterBar from "../../components/FilterBar/FilterBar";
import JobCards from "./JobCards";

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
