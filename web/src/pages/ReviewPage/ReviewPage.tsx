import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import Review from "../../components/Review/Review";
import ReviewPlace from "../../components/Review/Review";
import "./ReviewPage.css";

const ReviewPage = () => {
  return (
    <div>
      <NavBar />
      <div className="review-main">
        <SideNav />
        <Review />
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;
