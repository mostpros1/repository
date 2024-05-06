import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import SideNav from "../../components/ui/SideNav/SideNav";
import Review from "../../components/Review/Review";
import "./ReviewPage.css";

const ReviewPage = () => {
  return (
    <div>
      <NavBar />
      <div id="review-panel">
        <div id="side-panel-left-review">
          <SideNav />
        </div>
        <div id="side-panel-right-review">
          <Review />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReviewPage;
