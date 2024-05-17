import NavBar from "../../components/ui/NavBar/NavBar";
import ChatLayout from "./Chat-rt";
import Footer from "../../components/ui/Footer/Footer";

function ChatPage() {
  return (
    <div id="root">
      <NavBar />
      <ChatLayout />
      <Footer />
    </div>
  );
}

export default ChatPage;