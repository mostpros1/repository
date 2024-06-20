import React, { useEffect, useState } from "react";
import "./EditProfileSection.css";
import StarIcon from "@mui/icons-material/Star"; /* StarIcon */
import StarBorderIcon from "@mui/icons-material/StarBorder"; /* StarBorderIcon */
import LocationOnIcon from "@mui/icons-material/LocationOn"; /* LocationOnIcon */
import LinkedInIcon from "@mui/icons-material/LinkedIn"; /* LinkedInIcon */
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"; /* CalendarMonthIcon */
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Bas_R from "../../assets/Bas_R.png";
import Gardener from "../../assets/garden_designer_planning.png";
import Rik from "../../assets/Rik_C.png";
import Robbert from "../../assets/Robbert.W.png";
import Pfp from "../../assets/ElectrozPFP.png";
import { dynamo } from "../../../declarations";
import { Auth } from "aws-amplify";

/* Import Data Dynamically */
const EditProfileSection = () => {
  const [profileData, setProfileData] = useState({
    avatar: Pfp,
    name: "Jason D. Schilder",
    jobTitle: "Loodgieter",
    location: "Amsterdam, Nederland",
    rating: 4,
    phone: "+31 0612345678",
    email: "Janschilder@hotmail.com",
    introduction: "Hallo, ik ben Jason.",
    description:
      "Ik ben een Loodgieter voor meer dan 10 jaar. Ik heb aan veel projecten gewerkt en heb veel ervaring met alle klussen die te maken hebben met loodgieterswerk dus als je mij nodig heb neem meteen contact op met mij.",
    images: [Bas_R, Gardener, Rik, Robbert],
  });

  const [name, setName] = useState(profileData.name);
  const [jobTitle, setJobTitle] = useState(profileData.jobTitle);
  const [location, setLocation] = useState(profileData.location);
  const [phone, setPhone] = useState(profileData.phone);
  const [email, setEmail] = useState(profileData.email);
  const [introduction, setIntroduction] = useState(profileData.introduction);
  const [description, setDescription] = useState(profileData.description);

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
        if (data.Items && data.Items.length > 0) {
          console.log(data.Items[0]);
          setName(data.Items[0].first_name + " " + data.Items[0].last_name);
          setJobTitle(data.Items[0].user_type);
          setEmail(data.Items[0].email);
          setPhone(data.Items[0].phone_number);
          const Profparams = {
            TableName: "Professionals",
            IndexName: "emailIndex",
            KeyConditionExpression: "email = :email",
            ExpressionAttributeValues: {
              ":email": AUTHemail,
            },
          };
          const output = await dynamo.query(Profparams).promise();
          if (output.Items && output.Items.length > 0) {
            console.log("output", output.Items[0]);
            setDescription(output.Items[0].bio);
          }
        } else {
          console.log("No matching items found");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className="edit_profile_container">
      <div className="profile-con-upper">
        <div className="profile-con">
          <div className="sidebar-con">
            <img
              src={profileData.avatar}
              alt="Avatar"
              className="profile-pic"
            />
            <div className="star-con">
              <div className="star-review">
                {[...Array(5)].map((_, i) =>
                  i < profileData.rating ? (
                    <StarIcon key={i} />
                  ) : (
                    <StarBorderIcon key={i} />
                  )
                )}
              </div>
              <div className="profile-info-con">
                <h1>{name}</h1>
                <div className="profile-desc">
                  <div className="job-title">
                    <p>{jobTitle}</p>
                  </div>
                  <p>
                    <span className="profile-info-con-side">
                      <p>
                        <LinkedInIcon /> {name}
                      </p>
                      <p>
                        <LocationOnIcon />
                        {profileData.location}
                      </p>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="moreinfo">
            <div className="profile-right-con">
              <div className="profile-info-card">
                <h4>Contact informatie</h4>
                <ul>
                  <li>
                    <div className="phone-icon">
                      <PhoneInTalkIcon />
                    </div>
                    {phone}
                  </li>
                  <li>
                    <div className="email-sect">
                      <EmailRoundedIcon />
                      {email}
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="availability-con">
              <button className="availability-btn">
                <CalendarMonthIcon />
                Beschikbaarheid doorgeven
              </button>
            </div>
          </div>
        </div>
        <div className="text-con">
          <p>{introduction}</p>
          <span>{description}</span>
        </div>
      </div>
      <div className="profile-btn-con">
        <button className="change-btn">Wijzigen</button>
      </div>
      <div className="profile-middleline"></div>
      <div className="img-slideshow-con">
        <h3>Foto's en Video's</h3>
        <div className="img-upload">
          <div className="upload-dot-layout">
            <button>
              <AddRoundedIcon />
            </button>
            <p>Video uploaden</p>
          </div>
          <div className="img-grid">
            <div className="large-img">
              <img src={Bas_R} alt="Bas_R" />
            </div>
            <div className="small-images">
              {profileData.images.map((image, index) => (
                <img key={index} src={image} alt={`Profile ${index}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileSection;
