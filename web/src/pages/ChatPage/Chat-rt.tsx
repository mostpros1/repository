import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import "./Chat-rt.css";

function chatlayout() {
    return (
        <main className="chatdisplayMain ">
            <section className="sidenavChatSection">
                <article className="sideNavChat">
                    {/* inhoud sidenav */}
                    <SideNav />
                </article>
            </section>
            <section className='rightsideChatSection'>
                <ChatMain user={undefined} signOut={undefined} />
            </section>
        </main>
    );
}

export default chatlayout;