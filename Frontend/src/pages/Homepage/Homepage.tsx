import Navbar from "../../components/ui/Navbar"
import PopularCardsSection from "../../components/PopularCards/PopularCardsSection"
import Hero from "../../components/hero/Hero"
import MostprosDesc from "../../components/MostprosDesc/MostprosDesc"
import ChoresDesc from "../../components/ChoresDesc/ChoresDesc"
import Characteristics from "../../components/Characteristics/Characteristics"
import Reviews from "../../components/Reviews/Reviews"
import Footer from "../../components/ui/Footer/Footer"

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
        <Footer />
    </>
  );
}

export default Homepage;
