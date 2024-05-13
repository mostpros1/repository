import React, { useState, useEffect } from "react";
import { Auth } from 'aws-amplify';
import "./Jobs.css";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/view-prof.svg";
import chatIcon from "../../assets/chatIcon.svg";
import { dynamo } from "../../../declarations";
import { Link, useNavigate } from "react-router-dom";
import specialists from "../../data/specialists.js";

interface Specialist {
  id: number;
  name: string;
  tasks: { task: string; link: string }[];
  link?: string;
}

interface JobEntry {
  id: number;
  name: string;
  description: string;
  date: string;
  chats: number;
  isCurrent: boolean;
  status: string; // 'pending', 'current', 'finished'
}

const Jobs = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [jobEntries, setJobEntries] = useState<JobEntry[]>([]);
  const [currentTab, setCurrentTab] = useState("pending");
  const [userGroup, setUserGroup] = useState(""); // State to store user group
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setJobDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Job Description Submitted:", jobDescription);
  };

  useEffect(() => {
    const checkUserGroupAndFetchData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const groups = user.signInUserSession.accessToken.payload["cognito:groups"];
        const userEmail = user.attributes.email;
        const table = groups.includes("Professional") ? 'Professionals' : 'Clients';
        const indexName = groups.includes("Professional") ? 'professional_idIndex' : 'client_idIndex';

        const userData = await dynamo.query({
          TableName: table,
          IndexName: 'emailIndex',
          KeyConditionExpression: 'email = :email',
          ExpressionAttributeValues: { ':email': userEmail }
        }).promise();

        if (userData.Items && userData.Items.length > 0) {
          const projectsData = await dynamo.query({
            TableName: 'Projects',
            IndexName: indexName,
            KeyConditionExpression: `${groups.includes("Professional") ? 'professional_id' : 'client_id'} = :id`,
            ExpressionAttributeValues: { ':id': userData.Items[0].id }
          }).promise();

          if (projectsData.Items) {
            const newJobEntries = projectsData.Items.map(item => ({
              id: item.id,
              name: item.name,
              description: item.description,
              date: item.date,
              chats: item.chats,
              isCurrent: item.status === 'current',
              status: item.status // This attribute should be present in your DynamoDB data model
            }));

            setJobEntries(newJobEntries);
          }
        }
      } catch (error) {
        console.error("Error in fetching user data or querying DynamoDB", error);
      }
    };

    checkUserGroupAndFetchData();
  }, []);


  useEffect(() => {
    const fetchUserGroup = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        console.log(user);  // Debugging: See all user details in the console
        const groups = user.signInUserSession.accessToken.payload['cognito:groups'] || [];
        console.log("User Groups: ", groups);  // Debugging: Specifically see the group details

        if (groups.includes("Professional")) {
          setUserGroup("Professional");
        } else if (groups.includes("HomeOwner")) {
          setUserGroup("HomeOwner");
        } else {
          setUserGroup("NoGroup");  // Handling users with no group
        }
      } catch (error) {
        console.error("Failed to fetch user group", error);
      }
    };

    fetchUserGroup();
  }, []);

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
        {jobEntries.filter(job => job.status === currentTab).map((job, index) => (
          <div className="job-entry" key={index}>
            {/* Job details rendering */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
