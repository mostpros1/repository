import Navbar from "../../components/ui/Navbar"
import PopularCardsSection from "../../components/PopularCards/PopularCardsSection"
import Hero from "../../components/hero/Hero"
import MostprosDesc from "../../components/MostprosDesc/MostprosDesc"
import ChoresDesc from "../../components/ChoresDesc/ChoresDesc"
import Characteristics from "../../components/Characteristics/Characteristics"
import Reviews from "../../components/Reviews/Reviews"


import linkedIn from "../../assets/linkedin.png"

function Homepage() {
  return (
    <>
        
        {/* Navbar */}
        <Navbar />
        {/* --Hero-- */}
        <Hero />
        {/* --Content-- */}
        {/* How does Mostpros work? */}
        <MostprosDesc />
        {/* Popular Jobs */}
        <PopularCardsSection />
        {/* Find specialist for every job */}
        <ChoresDesc />
        {/* Why Mostpros */}
        <Characteristics/>
        {/* Reviews */}
        <Reviews />
        {/* --Footer-- */}
        <div className="footer_container">
          <div className="footerSection">
            <h4>Navigatie</h4>
            <a href="">Hoe werkt het</a>
            <a href="">Waarom mostpros</a>
            <a href="">Over</a>
            <a href="">Contact</a>
          </div>
          <div className="footerSection">
            <h4>Netwerk</h4>
            <p>Vakspecialist</p>
            <p>Huiseigenaren</p>
            <p>Developers</p>
            <p>Partners</p>
            <p>Studenten</p>
            <p>Startups</p>
          </div>
          <div className="footerSection">
            <h4>Office</h4>
            <p>2013 AS, Haarlem</p>
            <p>Kinderhuissingel 6-K</p>
          </div>
          <div className="footerSection">
            <h4>Social</h4> <img src={linkedIn} alt="" />
          </div>
        </div>
    </>
  );
}

export default Homepage;
