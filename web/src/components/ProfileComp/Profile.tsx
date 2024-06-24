import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./profile.css";
import { dynamo } from "../../../declarations";
import Pfp from "../../assets/ElectrozPFP.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; /* CalendarMonthIcon */
import { Auth } from "aws-amplify";
import Modal from "./profileModal.tsx"; // Import the Modal component

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Loading...",
    phone: "Loading...",
    email: "Loading...",
    bio: "Loading...",
    avatar: Pfp,
    workregion: "Loading...",
    profession: "Loading...",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableData, setEditableData] = useState(profileData);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const AUTHemail = user.attributes.email;

        const params = {
          TableName: "Users",
          IndexName: "username",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": AUTHemail,
          },
        };

        const data = await dynamo.query(params).promise();
        console.log("User data:", data);

        if (data.Items && data.Items.length > 0) {
          const userData = data.Items[0];
          const name = `${userData.first_name} ${userData.last_name}`;
          const phone = userData.phone_number || "Unknown";
          const email = userData.email;

          const Profparams = {
            TableName: "Professionals",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
              ":email": AUTHemail,
            },
          };
          const output = await dynamo.query(Profparams).promise();
          console.log("Professional data:", output);

          const profession =
            output.Items && output.Items.length > 0
              ? output.Items[0].profession
              : "Unknown";
          const workregion =
            output.Items && output.Items.length > 0
              ? output.Items[0].region
              : "Unknown";

          const bio =
            output.Items && output.Items.length > 0
              ? output.Items[0].bio
              : "No bio available";

          setProfileData({
            name,
            phone,
            email,
            bio,
            avatar: Pfp,
            workregion,
            profession,
          });
          setEditableData({
            name,
            phone,
            email,
            bio,
            avatar: Pfp,
            workregion,
            profession,
          });
        } else {
          console.log("No matching items found");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleEditButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const params = {
        TableName: "Users",
        Key: { email: profileData.email },
        UpdateExpression:
          "set first_name = :fname, last_name = :lname, phone_number = :phone, profession = :prof, region = :reg",
        ExpressionAttributeValues: {
          ":fname": editableData.name.split(" ")[0],
          ":lname": editableData.name.split(" ")[1],
          ":phone": editableData.phone,
          ":prof": editableData.profession,
          ":reg": editableData.workregion,
        },
        ReturnValues: "UPDATED_NEW",
      };

      await dynamo.update(params).promise();

      setProfileData(editableData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };


  return (
    <div id="mainProfile">
      <section id="ProfileSection">
        <div id="profileTop">
          <div id="profileLeftContainer">
            <img src={profileData.avatar} alt="profile" />
            <div className="profileInfo">
              <h1>HoofdBeroep: {profileData.profession}</h1>
              <p>Naam: {profileData.name}</p>
              <p>Werk Regio: {profileData.workregion} </p>
            </div>
          </div>
          <div id="profileRightContainer">
            <div id="profileContactinfo">
              <h1>Contact Information</h1>
              <p>Telefoonnummer: {profileData.phone}</p>
              <p>Email: {profileData.email}</p>
            </div>
            <div className="profileAvailabilityDiv">
              <button className="profileAvailability">
                <CalendarMonthIcon />
                Beschikbaarheid doorgeven
              </button>
            </div>
          </div>
        </div>
        <div id="profileBioArticle">
          <article id="profileBio">
            <p>{profileData.bio}</p>
          </article>
        </div>
        <section id="editButtonSection">
          <button id="profileEditbtn" onClick={handleEditButtonClick}>
            Wijzigen
          </button>
        </section>
      </section>
      <Modal show={isModalOpen} onClose={handleModalClose}>
        <div className="editProfileForm">
          <h2>Edit Profile</h2>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editableData.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={editableData.phone}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editableData.email}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Profession:
            <input
              type="text"
              name="profession"
              value={editableData.profession}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Work Region:
            <input
              type="text"
              name="workregion"
              value={editableData.workregion}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Bio:
            <textarea
              name="bio"
              value={editableData.bio}
              onChange={handleInputChange}
            ></textarea>
          </label>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
