import SideNav from "../../components/ui/SideNav/SideNav";
import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import FAQ from "../../components/FAQ/FAQ";
import faqpic from "../../assets/FAQ.svg";
import "./FAQPage.css";

function FAQPage() {
  return (
    <div>
      <NavBar />
      <div>
        <div className="faq-header-con">
          <section className="faq-header">
            <img src={faqpic} alt="faq" />
            <p>Veel gestelde vragen</p>
          </section>
          <div className="faq-con">
            <FAQ />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FAQPage;