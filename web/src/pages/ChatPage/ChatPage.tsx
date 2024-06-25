import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import Footer from "../../components/ui/Footer/Footer";
import "./ChatPage.css";

function ChatPage() {
  const dummySignOut = () => {
    console.log("Signed out");
  };

  return (
    <div id="root">
      <NavBar />
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
      <Footer />
    </div>
  );
}

export default ChatPage;
