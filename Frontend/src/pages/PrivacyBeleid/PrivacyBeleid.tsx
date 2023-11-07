import "./PrivacyBeleid.css"
import NavBar from "../../components/ui/NavBar/NavBar"
import Footer from "../../components/ui/Footer/Footer"
import PADHero from "../../components/PADHero/PADHero"
import PR_con from "../../components/PR_content/PR_con"

function PrivacyBeleid() {
  return (
    <>
        <NavBar />
        <div className="PR_con">
          <PADHero />
          <PR_con/>
        </div>
        <Footer />
    </>
  )
}

export default PrivacyBeleid