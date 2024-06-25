import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import Setup from "../../components/Setup/Setup";
import Footer from "../../components/ui/Footer/Footer";
import "./SetupPage.css"

function ReviewLayout() {
  return (
    <div>
      <NavBar />
    <main className="setupMain">
      <section className="sidenavSetupSection">
        <article className="sideNavSetup">
          <SideNav />
        </article>
      </section>
      <section className="rightsideSetupSection">
        <Setup />
        <Footer />
      </section>
    </main>
    </div>
  );
}

export default ReviewLayout;
