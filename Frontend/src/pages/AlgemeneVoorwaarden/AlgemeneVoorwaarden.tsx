import "./AlgemeneVoorwaarden.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import Footer from "../../components/ui/Footer/Footer"
import PADHero from "../../components/PADHero/PADHero"
import AVContent from "../../components/AVContent/AVContent"

function AlgemeneVoorwaarden() {
  return (
    <>
        <NavBar />
        <div className="AV_con">
          <PADHero />
          <AVContent/>
        </div>
        <Footer />
    </>
  )
}

export default AlgemeneVoorwaarden