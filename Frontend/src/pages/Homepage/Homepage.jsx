import Navbar from "../../components/ui/Navbar"
import PopularCardsSection from "../../components/PopularCards/PopularCardsSection"
import Hero from "../../components/hero/Hero"

import manWithHammerIcon from "../../assets/manmethammer.png"
import girlWithDrill from "../../assets/vrouwmetboor.png"
import peopleWithTools from "../../assets/2personenmettools.png"
import hovenier from "../../assets/hovenier.png"
import handyman from "../../assets/handyman.png"
import painter from "../../assets/stefano-manzini-B81670AyocM-unsplash.jpg"
import floors from "../../assets/ddp-kS1UuxzkuJE-unsplash.jpg"
import linkedIn from "../../assets/linkedin.png"
import star from "../../assets/icon _star 1_.png"
import emptyStar from "../../assets/icon _star 1_empty.png"
import one from "../../assets/1.png"
import two from "../../assets/2.png"
import three from "../../assets/3.png"
import schilder from "../../assets/schilder.png"
import banner from "../../assets/soroush-karimi-Mx5kwvzeGC0-unsplash.jpg"

function Homepage() {
  return (
    <>
        {/* --Header-- */}
        {/* Navbar */}
        <Navbar />
        <Hero />

        {/* --Content-- */}
        {/* How does Mostpros work? */}
        <div className="title_container">
          <h2>Hoe werkt Mostpros?</h2>
        </div>
        <div className="description_container">
          <div className="description">
            <h4>1 Beschrijf je klus</h4>
            <p>
              Denk aan klussen voor je uitbouw, renovatie, tegels, dak, keuken,
              ramen, deuren, badkamer, sanitair, stuken, verwarming,
              loodgieterswerk, elektriciteit, stofferen, slopen, afvoeren,
              isolatie, timmerwerken, algemene klussen, schoonmaak, enz.
            </p>
            <img src={manWithHammerIcon} alt="" />
          </div>
          <div className="description">
            <h4>2 Krijg een vakspecialist</h4>
            <p>
              Krijg een aannemer, gevelspecialist, metselaar, ontwerper,
              tegelzetter, dakdekker, keukenmonteur, glaszetter,
              kozijnspecialist, badkamerspecialist, stukadoor, installateur,
              loodgieter, elektricien enz.
            </p>
            <img src={girlWithDrill} alt="" />
          </div>
          <div className="description">
            <h4>3 Ontvang ondersteuning</h4>
            <p>
              Naast de standaard ondersteuning van de vakspecialist zijn we bij
              Mostpros.com ook constant opzoek naar slimmere manieren om
              iedereen in het netwerk te ondersteunen met groeien.
            </p>
            <img src={peopleWithTools} alt="" />
          </div>
        </div>
        {/* Popular Jobs */}
        <PopularCardsSection />
        {/* Find specialist for every job */}
        <div className="title_container">
          <h2>Vind vakmensen voor elke klus</h2>
        </div>
        <div className="jobs_container">
          <div className="jobCard">
            <img src={handyman} alt="" />
            <h4>Loodgieterswerk</h4>
            <a href="$">Alle informatie over Loodgieters</a>
          </div>
          <div className="jobCard">
            <img src={painter} alt="" />
            <h4>Schilderen</h4>
            <a href="$">Alle informatie over Schilders</a>
          </div>
          <div className="jobCard">
            <img src={floors} alt="" />
            <h4>Vloeren en tegels</h4>
            <a href="$">Alle informatie over Tegelzetters</a>
          </div>
        </div>
        <div className="button_container">
          <button className="button">Meer bekijken</button>
        </div>
        {/* Why Mostpros */}
        <div className="title_container">
          <h2>Waarom Mostpros</h2>
        </div>
        <div className="whyMostpros_container">
          <div className="whyMostpros_left">
            <div className="whyMostpros">
              <img src={one} alt="" />
              <h3>Groeiend vakspecialisten.</h3>
            </div>
            <div className="whyMostpros">
              <img src={two} alt="" />
              <h3>
                Toegang tot talentenpools met studenten en beginnende
                vakspecialisten
              </h3>
            </div>
            <div className="whyMostpros">
              <img src={three} alt="" />
              <h3>
                Advies en ondersteuning. Samen met de community zijn we
                voortdurend op zoek naar slimmere manieren om te klussen in en
                om je huis
              </h3>
            </div>
          </div>
          <div className="whyMostpros_right">
            <img src={schilder} alt="" />
          </div>
        </div>

        {/* Reviews */}
        <div className="title_container" id="title_container_blue">
          <h2>Reviews</h2>
        </div>
        <div className="review_container">
          <div className="review">
            <img src={handyman} alt="" className="reviewImage" />
            <div className="reviewContent_container">
              <div>
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={emptyStar} alt="" />
              </div>
              <p>Soort klus</p>
              <p>Naam van vakspecialist</p>
              <p>comment</p>
            </div>
          </div>
          <div className="review">
            <img src={handyman} alt="" className="reviewImage" />
            <div className="reviewContent_container">
              <div>
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={emptyStar} alt="" />
              </div>
              <p>Soort klus</p>
              <p>Naam van vakspecialist</p>
              <p>comment</p>
            </div>
          </div>
          <div className="review">
            <img src={handyman} alt="" className="reviewImage" />
            <div className="reviewContent_container">
              <div>
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={emptyStar} alt="" />
              </div>
              <p>Soort klus</p>
              <p>Naam van vakspecialist</p>
              <p>comment</p>
            </div>
          </div>
        </div>
        <div className="button_container">
          <button className="button">Nieuwe klus plaatsen</button>
        </div>
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
