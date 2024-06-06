import SideNav from "../../components/ui/SideNav/SideNav";
import Review from "../../components/Review/Review";
import Footer from "../../components/ui/Footer/Footer";
import "./Review-rt.css";

function ReviewLayout() {
  return (
    <main className="reviewMain">
      <section className="sidenavReviewSection">
        <article className="sideNavReview">
          {/* inhoud sidenav */}
          <SideNav />
        </article>
      </section>
      <section className="rightsideReviewSection">
        <Review />
        <Footer />
      </section>
    </main>
  );
}

export default ReviewLayout;
