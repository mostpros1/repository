import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./JobCards.css";
import gasleiding from "../../assets/Gasleiding.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { dynamo } from "../../../declarations";
interface Job {
  id: number;
  name: string;
  distance: number;
  title: string;
  description: string;
  location: string;
  availability: string;
  // img: string;
}

interface JobCardsProps {
  jobs?: Job[];
  user?: string[];
}


const JobCards: React.FC<JobCardsProps> = ({ jobs: initialJobs = [], user }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs); // Renamed from specialists to jobs
  
  useEffect(() => {
    const hashTag = window.location.hash.replace("#", "");
    
    
    /*dynamo.query({
      TableName: "clients",
      IndexName: "plaats",
      KeyConditionExpression: "plaats = :plaats",
      ExpressionAttributeValues: {
        ":plaats": hashTag,
      },
    }).promise()
    .then(data => {
      if (data.Items && data.Items.length > 0) {
        console.log(data.Items);
      } else {
        console.log('No items found');
      }
    })
    .catch(err => {
      console.log(err);
    });*/
    
    dynamo
    .scan({
      TableName: "Klussen",
    })
    .promise()
      .then(data => {
        // Assuming data.Items contains the necessary fields for the Job interface
        const jobsFromData = data.Items ? data.Items.map((item) => ({
          id: item.id,
          name: item.profession,
          distance: item.distance,
          title: item.task,
          description: item.description,
          location: item.region,
          availability: item.availability,
        })) : [];
        
        // Update the state with the jobs fetched from DynamoDB
        setJobs(jobsFromData);
      })
      .catch(console.error)
      
    }, []);
    
    const handleStartCChat = () => {
      window.location.href = `/chat?recipient=${user}`;
    };
    if (!jobs || jobs.length === 0) {
      return <div>No jobs available.</div>;
  }
  const jobCardsRender = jobs.map((job) => (
    <div key={job.id} className="job-item">
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
      <button className='main_btn' onClick={handleStartCChat}>Start chat</button>
    </div>
  ));
  return <>{jobCardsRender}</>;
};
export default JobCards;