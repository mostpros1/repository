import "./Whypage.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import Footer from "../../components/ui/Footer/Footer"
import WhyPage from "../../components/Whypage/Whypage_con"
import CheakHero from "../../components/CheakHero/CheakHero"

function Whypage() {
  return (
    <>
        <NavBar />
        <div className="Whypage_con">
          <CheakHero/>
          <Whypage/>
        </div>
        <Footer />
    </>
  )
}

export default Whypage