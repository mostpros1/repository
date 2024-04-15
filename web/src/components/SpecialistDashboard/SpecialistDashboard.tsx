import "./SpecialistDashboard.css";
import AddIcon from "@mui/icons-material/Add";
import PaymentOutlined from "@mui/icons-material/PaymentOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadsetMicOutlined from "@mui/icons-material/HeadsetMicOutlined";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Donald from "../../assets/donald.png";
import TaskCard from "../ui/TaskCard/TaskCard";
import { Task } from "@mui/icons-material";

const SpecialistDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* <!-- Profile Sidebar --> */}
      <aside className="sidebar">
        <div className="profile-card">
          <img src={Donald} alt="Jan Schilder" className="profile-picture" />
          <h2>Jan Schilder</h2>
          <p>
            <div className="CallIcon">
              <CallIcon />
            </div>
            +31 0612345678
          </p>
          <p>
            <div className="EmailIcon">
              <EmailIcon />
            </div>
            janschilder@hotmail.com
          </p>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">
            <PaymentOutlined />
            Betaalmethode
          </a>
          <a href="#" className="nav-item">
            <SettingsIcon />
            Account settings
          </a>
          <a href="#" className="nav-item">
            <HeadsetMicOutlined />
            Klanten service
          </a>
        </nav>
      </aside>
      
      {/* <!-- Task Cards --> */}
      <TaskCard />

      <div className="new-task-card">
        <div className="plus-con">
          <AddIcon />
          <p>Nieuwe klus zoeken</p>
        </div>
      </div>
    </div>
  );
};

export default SpecialistDashboard;
