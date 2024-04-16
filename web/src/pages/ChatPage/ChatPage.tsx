import NavBar from "../../components/ui/NavBar/NavBar";
import SideNav from "../../components/ui/SideNav/SideNav";
import ChatMain from "../../components/Chat/ChatMain";
import Footer from "../../components/ui/Footer/Footer";

function ChatPage() {
    return(
    <div id="root">
        <NavBar />
        <ChatMain user={undefined} signOut={undefined} />
        <SideNav />
        <Footer />
    </div>
    )
}

export default ChatPage;
