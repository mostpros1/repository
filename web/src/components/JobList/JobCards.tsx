<<<<<<< HEAD
import React from 'react'; // Import React
import "./JobCards.css"; // Import the CSS for styling
import gasleiding from "../../assets/Gasleiding.svg"; // Import the image, if you're using it in the job cards
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

=======
import React from "react"; // Import React
import "./JobCards.css"; // Import the CSS for styling
import gasleiding from "../../assets/Gasleiding.svg"; // Import the image, if you're using it in the job cards
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Import icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
>>>>>>> acceptance
// Define the structure of a job object
interface Job {
  id: number;
  name: string;
  distance: number;
  title: string;
  description: string;
  location: string;
  availability: string;
  // img: string; // Uncomment if you're using the image
}
<<<<<<< HEAD

=======
>>>>>>> acceptance
// Define the props for the JobCards component
interface JobCardsProps {
  jobs?: Job[]; // Make jobs optional or provide a default prop value
}
<<<<<<< HEAD

// Define the JobCards component
const JobCards: React.FC<JobCardsProps> = ({ jobs = [] }) => { // Provide a default empty array
  // Check if jobs is defined and has length; if not, you can render a fallback UI or return null/empty fragment
  if (!jobs || jobs.length === 0) {
    return <div>No jobs available.</div>; // or return <></> for nothing
  }

  // Map over the jobs array to create job cards
  const jobCardsRender = jobs.map((job) => (
    <div key={job.id} className="taskCard">
      <div className="user-detail">
        <h2>{job.name}</h2>
        <p><LocationOnIcon />{job.distance}KM</p>
=======
// Define the JobCards component
const JobCards: React.FC<JobCardsProps> = ({ jobs = [] }) => {
  // Provide a default empty array
  // Check if jobs is defined and has length; if not, you can render a fallback UI or return null/empty fragment
  if (!jobs || jobs.length === 0) {
    return <></>; // or return <></> for nothing
  }
  // Map over the jobs array to create job cards
  const jobCardsRender = jobs.map((job) => (
    <div key={job.id} className="job-item">
      <div className="user-detail">
        <h2>{job.name}</h2>
        <p>
          <LocationOnIcon />
          {job.distance}KM
        </p>
>>>>>>> acceptance
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
  ));
<<<<<<< HEAD

  return <>{jobCardsRender}</>;
};

=======
  return <>{jobCardsRender}</>;
};
>>>>>>> acceptance
export default JobCards;
