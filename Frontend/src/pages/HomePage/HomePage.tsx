import NavBar from "../../components/ui/NavBar/NavBar"
import PopularCardsSection from "../../components/PopularCards/PopularCardsSection"
import Hero from "../../components/Hero/Hero"
import MostprosDesc from "../../components/MostprosDesc/MostprosDesc"
import ChoresDesc from "../../components/ChoresDesc/ChoresDesc"
import Characteristics from "../../components/Characteristics/Characteristics"
import Reviews from "../../components/Reviews/Reviews"
import Footer from "../../components/ui/Footer/Footer"
import MobileNav from "../../components/ui/NavBar/MobileNav"

function HomePage() {
  return (
    <>
        {/* Navbar */}
        <NavBar />
        <MobileNav />
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

export default HomePage;
