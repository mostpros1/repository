import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import Footer from "../../components/ui/Footer/Footer";

function chatlayout() {
    return (
        <main className="templateMain">
            <section className="sidenavTemplateSection">
                <article className="sideNavTemplate">
                    {/* inhoud sidenav */}
                    <SideNav />
                </article>
            </section>
            <section className='rightsideTemplateSection'>
                <ChatMain user={undefined} signOut={undefined} />
            </section>
        </main>
    );
}

export default chatlayout;