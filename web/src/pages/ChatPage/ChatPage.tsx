import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import Footer from "../../components/ui/Footer/Footer";

function ChatPage() {
  return (
    <div id="root">
      <NavBar />
      <div id="flexbox-panel">
        <SideNav />
        <ChatMain user={undefined} signOut={undefined} />
      </div>
      <Footer />
    </div>
  );
}

export default ChatPage;