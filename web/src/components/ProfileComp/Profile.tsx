import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dynamo } from "../../../declarations";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Auth } from "aws-amplify";
import Modal from "./profileModal.tsx";
import { stopXSS } from "../../../../backend_functions/stopXSS.ts";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Pfp from "../../assets/placeholder_avatar.png";
import "./profile.css";

interface EditableDataType {
  name?: string;
  phone?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  workregion?: string;
  profession?: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "Loading...",
    phone: "Loading...",
    email: "Loading...",
    bio: "Loading...",
    avatar: Pfp,
    workregion: "Loading...",
    profession: "Loading...",
    userId: "",
    professionalID: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableData, setEditableData] = useState<EditableDataType>({});
  const [isProfessional, setIsProfessional] = useState(false);
  const [isHomeowner, setIsHomeowner] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

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
          const userId = userData.id;

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
              ? output.Items[0].work_region
              : "Unknown";
          const professionalID =
            output.Items && output.Items.length > 0
              ? output.Items[0].id
              : "Unknown";
          const bio =
            output.Items && output.Items.length > 0
              ? output.Items[0].bio
              : "No bio available";

          setProfileData({
            userId,
            professionalID,
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

          // Ensure the state update functions always receive a boolean
          setIsProfessional(output.Items && output.Items.length > 0 ? true : false);
          setIsHomeowner(output.Items && output.Items.length > 0 ? false : true);
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditableData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setEditableData((prevData) => ({
      ...prevData,
      phone: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      console.log(profileData.userId);
      alert("Profile data saved successfully!");
      const params = {
        TableName: "Users",
        Key: { id: profileData.userId },
        UpdateExpression:
          "set first_name = :fname, last_name = :lname, phone_number = :phone",
        ExpressionAttributeValues: {
          ":fname": stopXSS(String(editableData?.name?.split(" ")[0])),
          ":lname": stopXSS(String(editableData?.name?.split(" ")[1])),
          ":phone": stopXSS(String(editableData?.phone)),
        },
      };

      await dynamo.update(params).promise();

      const profParams = {
        TableName: "Professionals",
        Key: { id: profileData.professionalID },
        UpdateExpression:
          "set profession = :profession, bio = :bio, work_region = :region",
        ExpressionAttributeValues: {
          ":profession": editableData?.profession,
          ":bio": editableData?.bio,
          ":region": editableData?.workregion,
        },
      };

      await dynamo.update(profParams).promise();

      const { name, phone, email, bio, avatar, workregion, profession } =
        editableData || {};

      const newProfileData = {
        name: name || "Default Name",
        phone: phone || "Default Phone",
        email: email || "default@email.com",
        bio: bio || "Default Bio",
        avatar: avatar || Pfp,
        workregion: workregion || "Default Region",
        profession: profession || "Default Profession",
        userId: profileData.userId,
        professionalID: profileData.professionalID,
      };

      setProfileData(newProfileData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving profile data:", error);
    }
  };

  const handleAvailabilityClick = () => {
    navigate("/pro-dashboard/calender");
  };

  return (
    <div id="mainProfile">
      <section id="ProfileSection">
        <div id="profileTop">
          <div id="profileLeftContainer">
            <img src={profileData.avatar} alt="profile" />
            <div className="profileInfo">
              {isProfessional && (
                <>
                  <h1>Hoofdberoep: {profileData.profession}</h1>
                  <p>Naam: {profileData.name}</p>
                  <p>Werk Regio: {profileData.workregion} </p>
                </>
              )}
              {isHomeowner && (
                <>
                  <p>Naam: {profileData.name}</p>
                </>
              )}
            </div>
          </div>
          <div id="profileRightContainer">
            <div id="profileContactinfo">
              <h1>Contact Information</h1>
              <p>
                <PhoneIcon className="profilePhoneicon" />
                {profileData.phone}
              </p>
              <p>
                <EmailIcon className="profileMailicon" />
                {profileData.email}
              </p>
            </div>
            {isProfessional && (
              <div className="profileAvailabilityDiv">
                <button
                  className="profileAvailability"
                  onClick={handleAvailabilityClick}
                >
                  <CalendarMonthIcon />
                  Beschikbaarheid doorgeven
                </button>
              </div>
            )}
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
              value={editableData?.name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Phone:
            <PhoneInput
              value={editableData?.phone}
              onChange={handlePhoneChange}
              defaultCountry="NL"
              placeholder="+31658349021"
              international
              countryCallingCodeEditable={false}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editableData?.email}
              onChange={handleInputChange}
            />
          </label>
          {isProfessional && (
            <>
              <label>
                Profession:
                <input
                  type="text"
                  name="profession"
                  value={editableData?.profession}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Work Region:
                <input
                  type="text"
                  name="workregion"
                  value={editableData?.workregion}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Bio:
                <textarea
                  name="bio"
                  value={editableData?.bio}
                  onChange={handleInputChange}
                ></textarea>
              </label>
            </>
          )}
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
