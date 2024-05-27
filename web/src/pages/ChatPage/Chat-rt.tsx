import React from "react";
import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import "./Chat-rt.css";

function chatlayout() {
  const dummySignOut = () => {
    console.log("Signed out");
  };
  return (
    <main className="chatdisplayMain">
      <section className="sidenavChatSection">
        <article className="sideNavChat">
          <SideNav />
        </article>
      </section>
      <section className="rightsideChatSection">
        <ChatMain user={undefined} signOut={dummySignOut} />
      </section>
    </main>
  );
}

export default chatlayout;
