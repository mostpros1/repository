import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./JobCards.css";
import gasleiding from "../../assets/Gasleiding.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { dynamo } from "../../../declarations";
import { useLocation } from "react-router-dom";
import taal from "../ui/NavBar/Navigation.tsx";
import { Auth } from "aws-amplify";
interface Job {
  id: number;
  name: string;
  distance: number;
  title: string;
  description: string;
  location: string;
  availability: string;
  userEmail: string;
  // img: string;
}

interface JobCardsProps {
  jobs?: Job[];
  user?: string[];
}


const JobCards: React.FC<JobCardsProps> = ({ jobs: initialJobs = [] }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs); // Renamed from specialists to jobs

  useEffect(() => {
    const fetchData = async () => {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      const email = currentAuthenticatedUser.attributes.email;
  
      // Assuming you want to use the email for something, otherwise, you can remove it
      // dynamo.query({
      //   TableName: "clients",
      //   IndexName: "plaats",
      //   KeyConditionExpression: "plaats = :plaats",
      //   ExpressionAttributeValues: {
      //     ":plaats": hashTag,
      //   },
      // }).promise()
      //.then(data => {
      //   if (data.Items && data.Items.length > 0) {
      //     console.log(data.Items);
      //   } else {
      //     console.log('No items found');
      //   }
      // })
      //.catch(err => {
      //   console.log(err);
      // });
  
      dynamo.query({
        TableName: "Professionals",
        IndexName: "emailIndex",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email, // Use the email variable here
        },
      }).promise().then(data => {
        if (data.Items && data.Items.length > 0) {
          dynamo
           .query({
              TableName: "Klussen",
              IndexName: "professionIndex",
              KeyConditionExpression: "profession = :profession",
              FilterExpression: "currentStatus = :currentStatus",
              ExpressionAttributeValues: {
                ":profession": data.Items[0].profession,
                ":currentStatus": "pending"
              }
            })
           .promise()
           .then(output => {
              const jobsFromData = output.Items? output.Items.map((item) => ({
                id: item.id,
                name: item.profession,
                distance: item.distance,
                userEmail: item.user_email,
                title: item.task,
                description: item.description,
                location: item.region,
                availability: item.availability,
              })) : [];
  
              setJobs(jobsFromData);
            })
           .catch(console.error);
        }
      }).catch(console.error);
    };
  
    fetchData();
  }, []); // Include dependencies if needed

  //const location = useLocation();

  const handleChatButtonClick = (recipientEmail: string) => {
    const currentPath = `/${taal}/chat`;
    const recipientQuery = `recipient=${recipientEmail}`;
    const newUrl = `${currentPath}?${recipientQuery}`;
    window.location.href = newUrl;
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
      <button className='main_btn' onClick={() => handleChatButtonClick(job.userEmail)}>Contact opnemen</button>
    </div>
  ));
  return <>{jobCardsRender}</>;
};
export default JobCards;