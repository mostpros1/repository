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

const EditProfileSection = () => {
  return (
    <div className="edit_profile_container">
      <div className="profile-con-upper">
        <div className="profile-con">
          <div className="sidebar-con">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
              className="profile-pic"
            />
            <div className="star-con">
              <div className="star-review">
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarBorderIcon />
              </div>
              <div className="profile-info-con">
                <h1>Jason D. Schilder</h1>
                <div className="profile-desc">
                  <div className="job-title">
                    <p>Loodgieter</p>
                  </div>
                  <LocationOnIcon />
                  <p>
                    <span className="profile-info-con-side">
                      Jason D. Schilder
                      <LinkedInIcon />
                      Amsterdam, Nederland
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
                    +31 0612345678
                  </li>
                  <li>
                    <div className="email-sect">
                      <EmailRoundedIcon />
                      Janschilder@hotmail.com
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
          <p>Hallo, ik ben Jan.</p>
          <span>
            Ik ben een Loodgieter voor meer dan 10 jaar. Ik heb aan veel
            projecten gewerkt en heb veel ervaring met alle klussen die te maken
            hebben met loodgieterswerk dus als je mij nodig heb neem meteen
            contact op met mij.
          </span>
        </div>
      </div>
      <div className="profile-btn-con">
        <button className="change-btn">Wijzigen</button>
      </div>
      <div className="profile-under-sec"></div>
      <div className="img-slideshow-con">
        <p>Foto's en Video's</p>
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
              <img src={Bas_R} alt="Bas_R" />
              <img src={Gardener} alt="Bas_R" />
              <img src={Rik} alt="Bas_R" />
              <img src={Robbert} alt="Bas_R" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; //.....

export default EditProfileSection;
