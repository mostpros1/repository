import React, { useEffect, useState } from 'react'; // Import React and useState, useEffect hooks
import AWS from 'aws-sdk'; // Import AWS SDK
import "./JobCards.css"; // Import the CSS for styling
import gasleiding from "../../assets/Gasleiding.svg"; // Import the image, if you're using it in the job cards
import LocationOnIcon from '@mui/icons-material/LocationOn'; // Import icons
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { dynamo } from "../../../../backend_functions/declerations";

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

// Define the props for the JobCards component
interface JobCardsProps {
  jobs?: Job[]; // Make jobs optional or provide a default prop value
}

// Define the JobCards component
const JobCards: React.FC<JobCardsProps> = ({ jobs = [] }) => {
  const [specialists, setSpecialists] = useState<Job[]>([]);

  useEffect(() => {
    const hashTag = window.location.hash.replace("#", "");
    console.log(hashTag);
    dynamo.query({
      TableName: "clients",
      IndexName: "plaats",
      KeyConditionExpression: "plaats = :plaats",
      ExpressionAttributeValues: {
        ":plaats": hashTag,
      },
    }).promise()
      .then(data => {
        if (data.Items && data.Items.length > 0) {
          console.log(data.Items[0]);
          setSpecialists(data.Items);
        } else {
          console.log('No items found');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Render logic remains unchanged
  if (!specialists || specialists.length === 0) {
    return <div>No jobs available.</div>;
  }

  // Map over the jobs array to create job cards
  const jobCardsRender = jobs.map((job) => (
    <div key={job.id} className="taskCard">
      <div className="user-detail">
        <h2>{job.name}</h2>
        <p><LocationOnIcon />{job.distance}KM</p>
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

  return <>{jobCardsRender}</>;
};

export default JobCards;
