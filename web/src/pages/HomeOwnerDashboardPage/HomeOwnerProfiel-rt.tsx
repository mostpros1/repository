import EditProfileSection from "../../components/EditProfile/EditProfileSection";
import SideNav from "../../components/ui/SideNav/SideNav";
import "./HomeOwnerProfiel-rt.css";

function HomeOwnerProfileLayout() {
    return (
        <main className="homeOwnerProfileMain">
            <section className="sidenavHomeOwnerProfileSection">
                <article className="sideNavHomeOwnerProfile">
                    <SideNav />
                </article>
            </section>
            <section className='rightsideHomeOwnerProfileSection'>
                <EditProfileSection />
            </section>
        </main>
    );
}

export default HomeOwnerProfileLayout;