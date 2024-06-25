import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import ProfileComp from "../../components/ProfileComp/ProfileComp";

function ProfilePage() {
  return (
    <div id="root">
      <NavBar />
      <ProfileComp />
      <Footer />
    </div>
  );
}

export default ProfilePage;
