import React from "react";
import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import "./Chat-rt.css";

function chatlayout() {
    const signOut = () => {
        // Implement your sign-out logic here
        console.log("User signed out");
    };

    return (
        <main className="chatdisplayMain">
            <section className="sidenavChatSection">
                <article className="sideNavChat">
                    {/* inhoud sidenav */}
                    <SideNav />
                </article>
            </section>
            <section className='rightsideChatSection'>
                <ChatMain user={undefined} signOut={signOut} />
            </section>
        </main>
    );
}

export default chatlayout;
