import "./JobList.css";
import JobCards from "./JobCards";

function JobList() {
  return (
    <div className="job-con">
      <JobCards/>
      <JobCards/>
      <JobCards/>
    </div>
  );
}

export default JobList;
