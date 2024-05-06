import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import HomeOwnerDashboardLeftside from "../../components/HomeOwnerDashboard/HomeOwnerDashboardLeftside/HomeOwnerDashboardLeftside";
import HomeOwnerDashboardRightside from "../../components/HomeOwnerDashboard/HomeOwnerDashboardRightside/HomeOwnerDashboardRightside";
import "./DashboardPage.css";

const DashboardPage = () => {
  return (
    <>
      <NavBar />
      <div className="dashboard-con">
        <SideNav />
        <div className="HO_dashboard_wrapper">
          <div className="HO_dashboard_con">
            <HomeOwnerDashboardLeftside />
            <HomeOwnerDashboardRightside />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
