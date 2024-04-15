import SideNav from "../../components/ui/SideNav/SideNav";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import FAQ from "../../components/FAQ/FAQ";
import "./FAQPage.css";

function FAQPage() {
  return (
    <div>
      <NavBar />
      <div className="content">
        <div className="nav-con">
          <SideNav />
        </div>
        <div className="faq-con">
          <FAQ />
        </div>
      </div>
      <Footer />
    </div>
  );
}


export default FAQPage;
