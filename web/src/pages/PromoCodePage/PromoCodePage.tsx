import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import PromoCode from "../../components/PromoCode/PromoCode";
import Footer from "../../components/ui/Footer/Footer";
import "./PromoCodePage.css"

function ReviewLayout() {
  return (
    <div>
      <NavBar />
    <main className="reviewMain">
      <section className="sidenavReviewSection">
        <article className="sideNavReview">
          <SideNav />
        </article>
      </section>
      <section className="rightsideReviewSection">
        <PromoCode />
        <Footer />
      </section>
    </main>
    </div>
  );
}

export default ReviewLayout;
