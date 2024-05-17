import SideNav from "../../components/ui/SideNav/SideNav";
import HomeOwnerSettings from "../../components/HomeOwnerSettings/HomeOwnerSettings";
import "./HomeOwnerSettingsPage-rt.css";

function HomeOwnerSettingsPageLayout() {
    return (
        <main className="HomeOwnerSettingsMain">
            <section className="RightsideHomeOwnerSettingsSection">
                <article className="sideNavHomeOwnerSettingsPage">
                    {/* inhoud sidenav */}
                    <SideNav />
                </article>
            </section>
            <section className='rightsideHomeOwnerSettingsPage'>
                <HomeOwnerSettings />
            </section>
        </main>
    );
}

export default HomeOwnerSettingsPageLayout;