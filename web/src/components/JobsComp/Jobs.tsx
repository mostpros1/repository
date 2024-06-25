import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import "./Jobs.css";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/view-prof.svg"; // Add the correct path and icon
import chatIcon from "../../assets/chatIcon.svg"; // Add the correct path and icon
import { dynamo } from "../../../declarations";
import { Link, useNavigate } from "react-router-dom";
//import ViewProfessionals from "../ViewProfessionals/ViewProfessionals";
import specialists from "../../data/specialists.js";
import { taal } from "../ui/NavBar/Navigation.js";

interface Specialist {
  id: number;
  name: string;
  link?: string; // Move the 'link' property here
  tasks: { task: string; link?: string }[]; // Make the 'link' property optional for tasks
}

const Jobs = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [currentTab, setCurrentTab] = useState("pending"); // Default to showing pending jobs

  const jobEnt = [
    {
      id: 0,
      name: "test",
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 3,
      currentStatus: "pending",
    } /*,
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
    },*/,
    // Add more job entries...
  ];

  interface JobEntry {
    currentStatus: string;
    id: number;
    name: string;
    description: string;
    date: string;
    chats: number;
    isCurrent?: boolean;
  }

  const [jobEntries, setJobEntries] = useState<JobEntry[]>([]);

  const filterJobEntriesByTab = (
    jobEntries: JobEntry[],
    currentTab: string
  ) => {
    switch (currentTab) {
      case "pending":
        return jobEntries.filter((job) => job.currentStatus === "pending");
      case "current":
        return jobEntries.filter((job) => job.currentStatus === "current");
      case "finished":
        // Assuming you have a way to identify finished jobs, e.g., a 'status' property
        return jobEntries.filter((job) => job.currentStatus === "finished");
      default:
        return jobEntries;
    }
  };

  useEffect(() => {
    const fetchProfEmailAndQueryDynamo = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userEmail = user.attributes.email;
        dynamo
          .query({
            TableName: "Projects",
            IndexName: "professional_emailIndex",
            KeyConditionExpression: "professional_email = :professional_email",
            ExpressionAttributeValues: {
              ":professional_email": userEmail,
            },
          })
          .promise()
          .then((output) => {
            if (output.Items) {
              // Create a temporary array to accumulate new job entries
              const newJobEntries: JobEntry[] = [];
              for (let i = 0; i < output.Items.length; i++) {
                newJobEntries.push({
                  id: output.Items[i].id, // Assuming 'id' exists in AttributeMap
                  name: output.Items[i].name,
                  description: output.Items[i].description, // Assuming 'description' exists in AttributeMap
                  date: output.Items[i].date, // Assuming 'date' exists in AttributeMap
                  chats: output.Items[i].chats,
                  currentStatus: output.Items[i].currentStatus,
                });
              }
              // Update the state once with the accumulated array
              if (output.Items.length === 0) {
                setJobEntries(jobEnt);
              } else {
                setJobEntries(newJobEntries.filter(entry =>!jobEntries.some(existingEntry => existingEntry.id === entry.id)));
              }
            } else {
              console.log("No items found in the query");
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
            TableName: "Projects",
            IndexName: "client_emailIndex",
            KeyConditionExpression: "client_email = :client_email",
            ExpressionAttributeValues: {
              ":client_email": userEmail,
            },
          })
          .promise()
          .then((output) => {
            if (output.Items) {
              // Create a temporary array to accumulate new job entries
              const newJobEntries: JobEntry[] = [];
              for (let i = 0; i < output.Items.length; i++) {
                newJobEntries.push({
                  id: output.Items[i].id, // Assuming 'id' exists in AttributeMap
                  name: output.Items[i].name,
                  description: output.Items[i].description, // Assuming 'description' exists in AttributeMap
                  date: output.Items[i].date, // Assuming 'date' exists in AttributeMap
                  chats: output.Items[i].chats,
                  currentStatus: output.Items[i].currentStatus,
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
      } catch (error) {
        console.error("Error fetching user email or querying DynamoDB", error);
      }
    };

    const checkUserGroupAndFetch = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups =
          user.signInUserSession.accessToken.payload["cognito:groups"];
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
      !e.relatedTarget.classList.contains("Jobssearch_dropdown_item")
    ) {
      setShowList(false);
    }
  };

  const navigate = useNavigate();
  const handleInputFocus = () => {
    setShowList(true);
  };
  const handleResultClick = (link: string) => {
    navigate(`/nl/jobs${link ?? ""}`);
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
          handleResultClick(selectedResult.link ?? "");
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
            .filter((task) => task.task.toLowerCase().includes(searchTerm) || specialist.name.toLowerCase().includes(searchTerm))
            .map((task) => ({
                specialistName: specialist.name.toLowerCase(),
                task: task.task,
                link: task.link || "", // Handling missing link field
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


  const slicedResults = searchResults().slice(0, 20); // Beperk tot de eerste 5 resultaten

  const resultsRender = slicedResults.map((result, index) => (
    <Link
      to={`/${taal}/jobs#${result.specialistName}?${result.link ?? ""}`}
      key={index}
      className={`Jobssearch_dropdown_item ${
        index === selectedIndex ? "selected" : ""
      }`}
      onClick={() => handleResultClick(result.link ?? "")}
      onMouseOver={() => setSelectedIndex(index)}
    >
      <span>
        {result.specialistName ? `${result.specialistName} - ` : ""}{" "}
        {/* Add the specialist name with the - separator */}
        {result.task}
      </span>
    </Link>
  ));

  return (
    <div id="job-main">
      <p>Plaats een nieuwe klus</p>
      <div id="search-wrapper">
        <img src={searchicon} alt="search" id="search-icon" />
        <button type="submit" id="submit-button">
          <img src={rightarrow} alt="submit" />
        </button>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            id="job-input-field"
            type="text"
            placeholder="Beschrijf de baan (bijvoorbeeld, loodgieter)."
            value={value}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
          />
          <div className="JobsSearch_results-con">
            {showList && (
              <div className="Jobssearch_dropdown">{resultsRender}</div>
            )}
          </div>
        </form>
      </div>

      <div className="jobs-con">
        <div className="job-status">
          <button
            className={`status-button ${
              currentTab === "pending" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("pending")}
          >
            In behandeling
          </button>
          <button
            className={`status-button ${
              currentTab === "current" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("current")}
          >
            Lopende klussen
          </button>
          <button
            className={`status-button ${
              currentTab === "finished" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("finished")}
          >
            Voltooide Klussen
          </button>
        </div>
        <div className="job-list-con">
          <div className="job-list-vw">
            {filterJobEntriesByTab(jobEntries, currentTab).map((job) => (
              <div className="job-entry" key={job.id}>
                {" "}
                {/* Ensure job.id is unique */}
                <p className="job-description">{job.description}</p>
                <p className="job-date">{job.date}</p>
                <div className="job-actions">
                  <div
                    id="job-view-prof-con"
                    onClick={() =>
                      navigate(
                        `/home-owner-result#${job.name}?${job.description}!${job.date}`
                      )
                    }
                  >
                    <img src={viewProfessionalsIcon} alt="View Professionals" />
                    <span>Bekijk Vakspecialisten</span>
                  </div>
                  <div className="chat-indicator">
                    <img src={chatIcon} alt="Chat" />
                    <span>Lopende chats {`(${job.chats})`}</span>
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