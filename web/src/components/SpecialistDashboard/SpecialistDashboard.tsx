import "./SpecialistDashboard.css";
import Icon from "../../assets/kraan.svg";
import AddIcon from "@mui/icons-material/Add";
import PaymentOutlined from "@mui/icons-material/PaymentOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import HeadsetMicOutlined from "@mui/icons-material/HeadsetMicOutlined";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import Donald from "../../assets/donald.png";

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
      {/* <!-- Main Cards --> */}
      <main className="maincards">
        {/* <!-- Task Card --> */}
        <a className="current-task-title">Huidige Klussen</a>
        <div className="task-card">
          <h3 className="task-title">
            Loodgieters werk: nieuwe leiding aanleggen
          </h3>
          <div className="task-detail">
            <h4>Beschrijving</h4>
            <p>
              <span>Opdrachtnummer:</span> 234561
            </p>

            <h5>Type Klus</h5>

            <div className="type-klus">
              <img src={Icon} alt="Klus Icon" className="klus-icon" />
              <span>Nieuwe leiding aanleggen</span>
            </div>
            <h5>Aanvullende informatie:</h5>
            <p>
              De leiding in de keuken, badkamer en in de tuin moeten aangelegd
              worden. Er is geen schade in de keuken en badkamer. Er is wel
              schade in de tuin waar de leiding momenteel is.
            </p>
          </div>
          <button className="task-button">Klus bekijk</button>
        </div>

        {/* <!-- New Task Card Search --> */}
      </main>
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
