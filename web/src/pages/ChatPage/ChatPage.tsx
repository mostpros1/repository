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
      <div className="chat-panel">
        <div className="side-panel-left-chat">
          <SideNav />
        </div>
        <div className="side-panel-right-chat">
          <ChatMain user={undefined} signOut={dummySignOut} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ChatPage;