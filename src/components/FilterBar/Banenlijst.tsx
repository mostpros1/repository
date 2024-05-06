import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import filteredItems from "./FilterBar";

const Banenlijst = () => {
    return (
<div className="job-list">
{Array.isArray(filteredItems) && filteredItems.map((job) => (
  <div key={job.id} className="job-item">
    <div className="job-header">
      {/* <img src={job.img} alt={job.title} />  /*gasleiding icon is hidden */}
      <h2>{job.name}</h2>
      <p>
        <LocationOnIcon className="svg-Location" />
        {job.distance}km
      </p>
    </div>
    
    <div className="job-info">
    
      <h3>{job.title}</h3>
      <p>{job.description}</p>
    
    </div>

    <div className="jobInfo-extra-con">
      <div className="JobInfo-extra">
        <p>
          <LocationOnIcon
            className="svg-Location"
            style={{ fontSize: "24px" }}
          />
          Locatie: {job.location}
        </p>

        <p>
          <CalendarMonthIcon
            className="svg-Calender"
            style={{ fontSize: "24px" }}
          />{" "}
          Binnen {job.availability}
        </p>
      </div>
    </div>
    <button onClick={() => window.location.href = 'mailto:teammostpros@gmail.com'}>Contact opnemen</button>
  </div>
))}
</div>
    )
}

export default Banenlijst;