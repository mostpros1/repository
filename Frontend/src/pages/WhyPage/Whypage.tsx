import "./Whypage.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import Footer from "../../components/ui/Footer/Footer"
import CheakHero from "../../components/CheakHero/CheakHero"
import Whypage_con from "../../components/Whypage/Whypage_con"

function Whypage() {
  return (
    <>
        <NavBar />
        <div className="Whypage_con">
          <CheakHero/>
          <Whypage_con/>
        </div>
        <Footer />
    </>
  )
}

export default Whypage