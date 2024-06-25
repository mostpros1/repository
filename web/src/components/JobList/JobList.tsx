import "./JobList.css";
import SideNav from "../ui/SideNav/SideNav";
// import FilterBar from "../../components/FilterBar/FilterBar";
import JobCards from "./JobCards";

function JobList() {
  return (
    <main className="jobListMain">
      <section className="sideNavSection">
        <article className="sideNavJobList">
          <SideNav />
        </article>
      </section>
      <section className="rightsideJobListSection">
        <div className="displayCardsContainer">
          <JobCards />
        </div>
      </section>
    </main>
  );
}

export default JobList;
