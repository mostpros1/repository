import "./JobCards.css";
import gasleiding from "../../assets/Gasleiding.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function JobCards() {
  function JobCards({ jobs }) {
    const jobCardsRender = jobs.map((job) => {
      return (
        <div key={job.id} className="taskCard">
          <div className="user-detail">
            <h2>{job.name}</h2>
            <p>
              <LocationOnIcon />
              {job.distance}KM
            </p>
          </div>
          <div className="job-info">
            <h2 className="job-title">{job.title}</h2>
            <p className="job-desc">{job.description}</p>
          </div>
          <div className="jobInfo-extra-con">
            <div className="jobInfo-extra">
              <LocationOnIcon />
              <p>Locatie: {job.location}</p>
            </div>
            <div className="jobInfo-extra">
              <CalendarMonthIcon />
              <p>Binnen {job.availability}</p>
            </div>
          </div>
          <a className="mail_btn" href="mailto:teammostpros@gmail.com">
            Contact opnemen
          </a>
        </div>
      );
    });

    return <>{jobCardsRender}</>;
  }
}
export default JobCards;
