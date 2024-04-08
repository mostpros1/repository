import NavBar from "../../components/ui/NavBar/NavBar";
import Footer from "../../components/ui/Footer/Footer";
import VSHuidigeklussen from "../../components/VSMijnklussen/VSHuidigeklussen";
import "./VSMijnklussen.css";

function VSMijnklussen() {
  return (
    <div id="root">
      <NavBar />
      <VSHuidigeklussen />
      <Footer />
    </div>
  );
}

export default VSMijnklussen;
