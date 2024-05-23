import SideNav from "../../components/ui/SideNav/SideNav";
import Review from "../../components/Review/Review";
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
            <section className='rightsideReviewSection'>
                <Review />
            </section>
        </main>
    );
}

export default ReviewLayout;