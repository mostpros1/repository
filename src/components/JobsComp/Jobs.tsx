import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import "./Jobs.css";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/view-prof.svg"; // Add the correct path and icon
import chatIcon from "../../assets/chatIcon.svg"; // Add the correct path and icon
import { dynamo } from "../../../declarations";
//import ViewProfessionals from "../ViewProfessionals/ViewProfessionals";

const Jobs = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [currentTab, setCurrentTab] = useState("current"); // 'current' or 'finished'

  const handleInputChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Job Description Submitted:", jobDescription);
  };

  const jobEnt = [
    {
      id: 1,
      name: "test",
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 3,
      isCurrent: true,
    },
    {
      id: 2,
      name: "test",
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 1,
      isCurrent: true,
    },
    {
      id: 3,
      name: "test",
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 1,
      isCurrent: true,
    },
    {
      id: 4,
      name: "test",
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 1,
      isCurrent: true,
    },
    // Add more job entries...
  ];

  interface JobEntry {
    id: number;
    name: string;
    description: string;
    date: string;
    chats: number;
    isCurrent: boolean;
  }

  const [jobEntries, setJobEntries] = useState<JobEntry[]>([]);
   useEffect(() => {
    const fetchProfEmailAndQueryDynamo = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userEmail = user.attributes.email;
        console.log("User email: ", userEmail);
        dynamo
          .query({
            TableName: 'Professionals',
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
              ':email': userEmail
            }
          })
          .promise()
          .then(data => {
            if (data.Items && data.Items.length > 0) {
              dynamo
                .query({
                  TableName: 'Projects',
                  IndexName: 'professional_idIndex',
                  KeyConditionExpression: 'professional_id = :professional_id',
                  ExpressionAttributeValues: {
                    ':professional_id': data.Items[0].id
                  }
                })
                .promise()
                .then(output => {
                  if (output.Items) {
                    
                    // Create a temporary array to accumulate new job entries
                    const newJobEntries: JobEntry[] = [];
                    for (let i = 0; i < output.Items.length; i++) {
                      console.log(output.Items[i]);
                      newJobEntries.push({
                        id: output.Items[i].id, // Assuming 'id' exists in AttributeMap
                        name: output.Items[i].name,
                        description: output.Items[i].description, // Assuming 'description' exists in AttributeMap
                        date: output.Items[i].date, // Assuming 'date' exists in AttributeMap
                        chats: output.Items[i].chats,
                        isCurrent: true,
                      });
                    }
                    // Update the state once with the accumulated array
                    if (output.Items.length === 0){
                      setJobEntries(jobEnt);
                    }else {
                    setJobEntries([...jobEntries, ...newJobEntries]);
                 }
                 } else {
                    console.log("No items found in the query");
                  }
                })
                .catch(console.error);
            } else {
              console.error("No items found in the first query");
            }
          })
          .catch(console.error);
      } catch (error) {
        console.error("Error fetching user email or querying DynamoDB", error);
      }
    };
    const fetchUserEmailAndQueryDynamo = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userEmail = user.attributes.email;

        dynamo
          .query({
            TableName: 'Clients',
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
              ':email': userEmail
            }
          })
          .promise()
          .then(data => {
            if (data.Items && data.Items.length > 0) {
              dynamo
                .query({
                  TableName: 'Projects',
                  IndexName: 'client_idIndex',
                  KeyConditionExpression: 'client_id = :client_id',
                  ExpressionAttributeValues: {
                    ':client_id': data.Items[0].id
                  }
                })
                .promise()
                .then(output => {
                  if (output.Items) {
                    
                    // Create a temporary array to accumulate new job entries
                    const newJobEntries: JobEntry[] = [];
                    for (let i = 0; i < output.Items.length; i++) {
                      console.log(output.Items[i]);
                      newJobEntries.push({
                        id: output.Items[i].id, // Assuming 'id' exists in AttributeMap
                        name: output.Items[i].name,
                        description: output.Items[i].description, // Assuming 'description' exists in AttributeMap
                        date: output.Items[i].date, // Assuming 'date' exists in AttributeMap
                        chats: output.Items[i].chats,
                        isCurrent: true,
                      });
                    }
                    // Update the state once with the accumulated array
                    if (output.Items.length === 0){
                      setJobEntries(jobEnt);
                    }else {
                    setJobEntries([...jobEntries, ...newJobEntries]);
                 }
                 } else {
                    console.log("No items found in the query");
                  }
                })
                .catch(console.error);
            } else {
              console.error("No items found in Clients the first query");
            }
          })
          .catch(console.error);
      } catch (error) {
        console.error("Error fetching user email or querying DynamoDB", error);
      }
    };

    const checkUserGroupAndFetch = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        if (groups && groups.includes("Professional")) {
          fetchProfEmailAndQueryDynamo();
        } else if (groups && groups.includes("Homeowner")) {
          fetchUserEmailAndQueryDynamo();
        }
      } catch (error) {
        console.error("Error checking user group", error);
      }
    };

    checkUserGroupAndFetch();
  }, []); // Make sure to include any dependencies in this array


  return (
    <div id="job-main">
      <p>Place a new job</p>
      <div id="search-wrapper">
        <img src={searchicon} alt="search" id="search-icon" />
        <form onSubmit={handleSubmit} id="search-form">
          <input
            id="job-input-field"
            type="text"
            placeholder="describe the job (example, plumbing.)"
            value={jobDescription}
            onChange={handleInputChange}
          />
          <button type="submit" id="submit-button">
            <img src={rightarrow} alt="submit" />
          </button>
        </form>
      </div>

      <div className="jobs-con">
        <div className="job-status">
          <button
            className={`status-button ${currentTab === "current" ? "active" : ""
              }`}
            onClick={() => setCurrentTab("current")}
          >
            Current jobs
          </button>
          <button
            className={`status-button ${currentTab === "finished" ? "active" : ""
              }`}
            onClick={() => setCurrentTab("finished")}
          >
            Finished jobs
          </button>
        </div>
        <div className="job-list-con">
          <div className="job-list-vw">
            {jobEntries
              .filter((job) =>
                currentTab === "current" ? job.isCurrent : !job.isCurrent
              )
              .map((job) => (
                <div className="job-entry" key={job.id}>
                  <p className="job-description">{job.description}</p>
                  <p className="job-date">{job.date}</p>
                  <div className="job-actions">
                    <div id="job-view-prof-con">
                      <img
                        src={viewProfessionalsIcon}
                        alt="View Professionals"
                      />
                      <span>View professionals</span>
                    </div>
                    <div className="chat-indicator">
                      <img src={chatIcon} alt="Chat" />
                      <span>Ongoing chats {`(${job.chats})`}</span>
                    </div>
                  </div>
                  <p className="job-view">View job</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
