import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import PrivacyPolicy from "../../components/Privacy-Policy/privacy-policy";
import "./PrivacyPolicyPage.css";

function PrivacyPolicyPage() {
  return (
    <div id="root">
      <NavBar />
      <PrivacyPolicy />
      <Footer />
    </div>
  );
}

export default PrivacyPolicyPage;