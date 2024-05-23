import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import FAQPageLayout from "./FAQPage-rt";
import "./FAQPage.css";

function FAQPage() {
  return (
    <div id="root">
      <NavBar />
      <FAQPageLayout />
      <Footer />
    </div>
  );
}

export default FAQPage;
