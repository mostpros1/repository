import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import HomeOwnerProfileLayout from "./HomeOwnerProfiel-rt";
import "./HomeOwnerProfiel.css";

function HomeOwnerProfielPage() {
  return (
    <div id="root">
      <NavBar />
      <HomeOwnerProfileLayout />
      <Footer />
    </div>
  );
}

export default HomeOwnerProfielPage;
