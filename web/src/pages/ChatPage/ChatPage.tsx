import NavBar from "../../components/ui/NavBar/NavBar";
import chatlayout from "./Chat-rt";
import Footer from "../../components/ui/Footer/Footer";

function ChatPage() {
  return (
    <div id="root">
      <NavBar />
      <chatlayout />
      <Footer />
    </div>
  );
}

export default ChatPage;