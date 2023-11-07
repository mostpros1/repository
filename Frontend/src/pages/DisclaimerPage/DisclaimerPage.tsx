import "./DisclaimerPage.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import Footer from "../../components/ui/Footer/Footer"
import PADHero from "../../components/PADHero/PADHero"
import PADContent from "../../components/PADContent/PADContent"

function DisclaimerPage() {
  return (
    <>
        <NavBar />
        <div className="disclaimer_con">
          <PADHero />
          <PADContent/>
        </div>
        <Footer />
    </>
  )
}


export default DisclaimerPage