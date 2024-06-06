import "./MyTaskPage.css";
import NavBar from "../../components/ui/NavBar/NavBar";
import MyTaskList from "../../components/MyTaskList/MyTaskList";
import Footer from "../../components/ui/Footer/Footer";

function MyTaskPage() {
  return (
    <main id="root">
      <NavBar />
      <MyTaskList />
      <Footer />
    </main>
  );
}

export default MyTaskPage;
