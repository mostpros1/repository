import React, { useState, useEffect, useCallback } from "react";
import { Auth } from 'aws-amplify';
import "./Jobs.css";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/view-prof.svg"; // Add the correct path and icon
import chatIcon from "../../assets/chatIcon.svg"; // Add the correct path and icon
import { dynamo } from "../../../declarations";
import { Link, useNavigate } from "react-router-dom";
//import ViewProfessionals from "../ViewProfessionals/ViewProfessionals";
import specialists from "../../data/specialists.js";
import SideNav from "../ui/SideNav/SideNav";


interface Specialist {
  id: number;
  name: string;
  tasks: { task: string; link: string }[];
  link?: string;
}


const Jobs = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [currentTab, setCurrentTab] = useState("current"); // 'current' or 'finished'

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
                    if (output.Items.length === 0) {
                      setJobEntries(jobEnt);
                    } else {
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
                    if (output.Items.length === 0) {
                      setJobEntries(jobEnt);
                    } else {
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
        const groups = user.signInUserSession.accessToken.payload['cognito:groups']

        if (groups.includes("Professional")) {
          setUserGroup("Professional");
        } else if (groups.includes("HomeOwner")) {
          setUserGroup("HomeOwner");
        } else {
          setUserGroup("NoGroup");  // Handling users with no group
        }
      } catch (error) {
        console.error("Error checking user group", error);
      }
    };

    checkUserGroupAndFetch();
  }, []); // Make sure to include any dependencies in this array


  //zoekbalk

  const [value, setValue] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Job Description Submitted:", jobDescription);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (
      !e.relatedTarget ||
      !e.relatedTarget.classList.contains("search_dropdown_item")
    ) {
      setShowList(false);
    }
  };

  const navigate = useNavigate();
  const handleInputFocus = () => {
    setShowList(true);
  };
  const handleResultClick = (link: string) => {
    navigate(`/nl/jobs${link}`);
  };


  const handleInputKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
        setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case "ArrowDown":
        setSelectedIndex((prevIndex) =>
          Math.min(prevIndex + 1, slicedResults.length - 1)
        );
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < slicedResults.length) {
          const selectedResult = slicedResults[selectedIndex];
          handleResultClick(selectedResult.link);
        }
        break;
      case "Tab": // Implementing autocomplete on Tab key
        if (slicedResults.length > 0) {
          const selectedResult = slicedResults[0];
          setValue(selectedResult.task); // Autocomplete with the first suggestion
          setSelectedIndex(0);
        }
        break;
      default:
        break;
    }
  };


  const searchResults = () => {
    const searchTerm = value.toLowerCase().trim();

    // Search for matches in individual tasks and specialist names
    const taskResults = specialists.flatMap((specialist) => {
      const tasks = specialist.tasks
        .filter((task) => task.task.toLowerCase().includes(searchTerm))
        .map((task) => ({
          specialistName: specialist.name.toLowerCase(),
          task: task.task,
          link: task.link,
        }));

      return tasks.length > 0 ? tasks : [];
    });


    const specialistResults = specialists
      .filter((specialist) =>
        specialist.name.toLowerCase().includes(searchTerm)
      )
      .map((specialist: Specialist) => ({
        specialistName: specialist.name.toLowerCase(),
        task: "", // Assuming a task field is required, you might want to adjust this
        link: specialist.link || "", // Assuming a link field is required, you might want to adjust this
      }));

    return [...taskResults, ...specialistResults];
  };


  const getPendingJobs = useCallback(async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const email = user.attributes.email; // Use the authenticated user's email
      console.log("email: ", email);
      dynamo.query({
        TableName: "Klussen",
        IndexName: "user_emailIndex",
        KeyConditionExpression: "user_email = :email",
        FilterExpression: "currentStatus = :currentStatus",
        ExpressionAttributeValues: {
          ":email": email,
          ":currentStatus": currentTab//"pending"
        }
      }).promise().then((data) => {
        console.log(data);
        console.log("Current tab: ", currentTab);
        if (data.Items && data.Items.length > 0) {
          console.log("data.Items: ", data.Items);
          const newJobEntries = data.Items.map(item => ({
            status: item.currentStatus,
            id: item.id,
            name: item.profession,
            region: item.region,
            description: item.task,
            user_email: item.user_email,
            date: "Aangemaakt op: " + item.date, // Provide a default date or derive it from item
            chats: item.chats, // Provide a default number of chats or derive it from item
            isCurrent: item.isCurrent, // Provide a default boolean value or derive it from item
          }));
          setJobEntries(newJobEntries); // Assuming jobEntries is initialized as an array
        }
      }).catch((error) => {
        console.error("Error fetching pending jobs:", error);
      });
    } catch (error) {
      console.error("Error fetching pending jobs:", error);
    }
  }, [currentTab]); // Add currentTab as a dependency if it's used inside getPendingJobs

  useEffect(() => {
    getPendingJobs();
    console.log("jobEntries: ", jobEntries);
    console.log("Current tab changed to: ", currentTab);
  }, [currentTab]);

  const slicedResults = searchResults().slice(0, 5); // Beperk tot de eerste 5 resultaten

  const resultsRender = slicedResults.map((result, index) => (
    <Link
      to={`/nl/jobs#${result.specialistName.replace('/', '')}?${result.link.replace('/', '')}`}
      key={index}
      className={`search_dropdown_item ${index === selectedIndex ? "selected" : ""
        }`}
      onClick={() => handleResultClick(result.link)}
      onMouseOver={() => setSelectedIndex(index)}
    >
      <span>
        {result.specialistName ? `${result.specialistName} - ` : ""}
        {result.task}
      </span>
    </Link>
  ));

  const renderJobEntries = () => {
    const filteredJobs = jobEntries.filter((job) => job.status === currentTab);
    return filteredJobs.map((job) => (
      <div className="job-entry" key={job.id}>
        <div className="job-description"><b>{job.name.charAt(0).toUpperCase() + job.name.slice(1)}</b></div>
        <div className="job-description">{job.description}</div>
        <div className="job-date">{job.date}</div>
        <div className="job-actions">
          <div id="job-view-prof-con">
            <span>View professionals</span>
            <img src={viewProfessionalsIcon} alt="view professionals" />
          </div>
          <div className="chat-indicator">
            <span>Ongoing chats ({job.chats})</span>
            <img src={chatIcon} alt="chat" />
          </div>
        </div>
        <Link to={`/nl/jobs/${job.id}`} className="job-view">
          View job
        </Link>
      </div>
    ));
  };

  return (
    <div id="job-main">
      <div id="search-wrapper">
        <img src={searchicon} alt="search" id="search-icon" />
        <form onSubmit={handleSubmit} id="search-form">
          <input
            id="job-input-field"
            type="text"
            placeholder="describe the job (example, plumbing.)"
            value={jobDescription}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
          />
          <div className={showList ? "search_dropdown open" : "search_dropdown"}>
            {/* results render */}
            {resultsRender}
          </div>
          <button type="submit" id="submit-button">
            <img src={rightarrow} alt="submit" />
          </button>
        </form>
      </div>
      <div className="job-status">
        {userGroup === "HomeOwner" ? (
          <>
            <button className={`status-button ${currentTab === "pending" ? "active" : ""}`} onClick={() => setCurrentTab("pending")}>Pending Jobs</button>
            <button className={`status-button ${currentTab === "current" ? "active" : ""}`} onClick={() => setCurrentTab("current")}>Current Jobs</button>
            <button className={`status-button ${currentTab === "finished" ? "active" : ""}`} onClick={() => setCurrentTab("finished")}>Finished Jobs</button>
          </>
        ) : userGroup === "Professional" && (
          <>
            <button className={`status-button ${currentTab === "request" ? "active" : ""}`} onClick={() => setCurrentTab("request")}>Request Jobs</button>
            <button className={`status-button ${currentTab === "current" ? "active" : ""}`} onClick={() => setCurrentTab("current")}>Current Jobs</button>
            <button className={`status-button ${currentTab === "finished" ? "active" : ""}`} onClick={() => setCurrentTab("finished")}>Finished Jobs</button>
          </>
        )}
      </div>
      <div className="job-list-con">
        {/* Render job entries based on the selected tab */}
        {renderJobEntries()}
      </div>
    </div>
  );
}
export default Jobs;