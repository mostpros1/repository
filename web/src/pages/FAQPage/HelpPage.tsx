import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import FAQPageLayout from "./HelpPage-rt";
import "./FAQPage.css";

function HelpPage() {
  return (
    <div id="root">
      <NavBar />
      <FAQPageLayout />
      <Footer />
    </div>
  );
}

export default HelpPage;
