import React, { useEffect, useState } from "react";
import Jobs from "../../components/JobsComp/Jobs";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./Jobs-rt.css";

function JobsLayout() {
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);


  return (
    <main className="jobsMain">
      <section className="sidenavJobsSection">
        <article className="sideNavJobs">
          {/* inhoud sidenav */}
          <SideNav />
        </article>
      </section>
      <section className="rightsideJobsSection">
        <Jobs />
      </section>
    </main>
  );
}

export default JobsLayout;
