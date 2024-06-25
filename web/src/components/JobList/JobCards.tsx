import React, { useEffect, useState } from "react";
import AWS from "aws-sdk";
import "./JobCards.css";
import gasleiding from "../../assets/Gasleiding.svg";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { dynamo } from "../../../declarations";
import { useLocation, useNavigation } from "react-router-dom";
import taal from "../ui/NavBar/Navigation.tsx";
import { Auth } from "aws-amplify";
import { useChatBackend } from "../../components/Chat/ChatBackend.ts";

interface Job {
  id: number;
  name: string;
  distance: number;
  title: string;
  description: string;
  location: string;
  availability: string;
  userId: number;
  // img: string;
}

interface JobCardsProps {
  jobs?: Job[];
  user?: string[];
}

const JobCards: React.FC<JobCardsProps> = ({ jobs: initialJobs = [] }) => {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [user, setUser] = useState<any>(null); // Adjust the type according to your user object structure
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      const email = currentAuthenticatedUser.attributes.email;

      dynamo
        .query({
          TableName: "Professionals",
          IndexName: "emailIndex",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": email,
          },
        })
        .promise()
        .then((data) => {
          if (data.Items && data.Items.length > 0) {
            dynamo
              .query({
                TableName: "Klussen",
                IndexName: "professionIndex",
                KeyConditionExpression: "profession = :profession",
                FilterExpression: "currentStatus = :currentStatus",
                ExpressionAttributeValues: {
                  ":profession": data.Items[0].profession,
                  ":currentStatus": "pending",
                },
              })
              .promise()
              .then((output) => {
                const jobsFromData = output.Items
                  ? output.Items.map((item) => ({
                    id: item.id,
                    name: item.profession,
                    distance: item.distance,
                    userId: item.user_id,
                    title: item.task,
                    description: item.description,
                    location: item.work_region,
                    availability: item.date,
                  }))
                  : [];
                setJobs(jobsFromData);
              })
              .catch(console.error);
          }
        })
        .catch(console.error);

      setUser(currentAuthenticatedUser);
      setLoading(false); // Set loading to false after user is fetched
    };

    fetchData();
  }, []); // Include dependencies if needed

  // const dummySignOut = () => {
  //   console.log("Signed out");
  // };

  //const { handleStartNewChatWithEmailDashboard } = useChatBackend(user, dummySignOut);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting for user data
  }

  if (!jobs || jobs.length === 0) {
    return <div className="no-jobs">No jobs available.</div>;
  }

  const handleChatButtonClick = (userId: number) => {
    console.log(userId);

    window.location.href = `/nl/pro-dashboard/chat?id=${userId}`;

  };

  const jobCardsRender = jobs.map((job) => (
    <div key={job.id} className="job-item">
      <div className="user-detail">
        <h2>{job.name}</h2>
        <p>
          <LocationOnIcon /> {job.distance}KM
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
          <p> {job.availability}</p>
        </div>
      </div>
      <button className="main_btn" onClick={() => handleChatButtonClick(job.userId)}>
        Contact opnemen
      </button>
    </div>
  ));

  return <>{jobCardsRender}</>;
};

export default JobCards;