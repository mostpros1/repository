import NavBar from "../../components/ui/NavBar/NavBar"
import PopularCardsSection from "../../components/PopularCards/PopularCardsSection"
import Hero from "../../components/Hero/Hero"
import MostprosDesc from "../../components/MostprosDesc/MostprosDesc"
import ChoresDescription from "../../components/ChoresDescription/ChoresDescription"
import Characteristics from "../../components/Characteristics/Characteristics"
import Reviews from "../../components/Reviews/Reviews"
import Footer from "../../components/ui/Footer/Footer"

function HomePage() {
  return (
    <>
        {/* Navbar */}
        <NavBar />
        {/* --Hero-- */}    
        <Hero />
        {/* --Content-- */}
        {/* How does Mostpros work? */}
        <MostprosDesc />
        {/* Popular Jobs */}
        <PopularCardsSection />
        {/* Find specialist for every job */}
        <ChoresDescription />
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
