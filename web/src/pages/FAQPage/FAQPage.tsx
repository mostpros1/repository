import SideNav from "../../components/ui/SideNav/SideNav";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import FAQ from "../../components/FAQ/FAQ";
import "./FAQPage.css";

function FAQPage() {
  return (
    <div id="root">
      <NavBar />
      <FAQ />
      <Footer />
    </div>
  );
}

export default FAQPage;
