import React, { useState } from "react";
import "./Jobs.css";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/cropped-23107-9-tools-transparent-image 1.svg"; // Add the correct path and icon
import chatIcon from "../../assets/chatIcon.svg"; // Add the correct path and icon

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

  const jobEntries = [
    {
      id: 1,
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 3,
      isCurrent: true,
    },
    {
      id: 1,
      description: "Bestrating: 50 m²; Tuin of Patio; Tegels",
      date: "25-3-2024",
      chats: 3,
      isCurrent: true,
    },
    // Add more job entries...
  ];

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
            className={`status-button ${
              currentTab === "current" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("current")}
          >
            Current jobs
          </button>
          <button
            className={`status-button ${
              currentTab === "finished" ? "active" : ""
            }`}
            onClick={() => setCurrentTab("finished")}
          >
            Finished jobs
          </button>
        </div>
        <div className="job-list">
          {jobEntries
            .filter((job) =>
              currentTab === "current" ? job.isCurrent : !job.isCurrent
            )
            .map((job) => (
              <div className="job-entry" key={job.id}>
                <p className="job-description">{job.description}</p>
                <p className="job-date">{job.date}</p>
                <div className="job-actions">
                  <img src={viewProfessionalsIcon} alt="View Professionals" />
                  <div className="chat-indicator">
                    <img src={chatIcon} alt="Chat" />
                    <span>{`(${job.chats})`}</span>
                  </div>
                </div>
                <p>View job</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
