import "./HomeOwnerResultPage.css";
import NavBar from "../../components/ui/NavBar/NavBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import SpecialistList from "../../components/SpecialistList/SpecialistList";
import SideNav from "../../components/ui/SideNav/SideNav";
import Footer from "../../components/ui/Footer/Footer";

function HomeOwnerResultPage() {
  return (
    <>
      <NavBar />
      <div className="HOresult-con">
        <div className="HO_result">
          <div className="sidenav-con-ts">
            <SideNav />
          </div>
          <div className="HO_wrapper">
            <FilterBar />
            <SpecialistList />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeOwnerResultPage;
