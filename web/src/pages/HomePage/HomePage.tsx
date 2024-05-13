import NavBar from "../../components/ui/NavBar/NavBar";
import HighlightBanner from "../../components/HighlightBanner/HighlightBanner";
import PopularCardsSection from "../../components/PopularCards/PopularCardsSection";
import Hero from "../../components/Hero/Hero";
import MostprosDesc from "../../components/MostprosDesc/MostprosDesc";
import ChoresDescription from "../../components/ChoresDescription/ChoresDescription";
import Characteristics from "../../components/Characteristics/Characteristics";
import Reviews from "../../components/Reviews/Reviews";
import Professionals from "../../components/Professionals/Professionals";
import Footer from "../../components/ui/Footer/Footer";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      {/* Navbar */}
      <NavBar />
      {/* --Hero-- */}
      <Hero />
      {/* --Content-- */}
      <HighlightBanner />
      {/* How does Mostpros work? */}
      <MostprosDesc />
      {/* Popular Jobs */}
      {/* Find specialist for every job */}
      <ChoresDescription />
      {/* Why Mostpros */}
      <Characteristics />
      {/* Reviews */}
      <Reviews />
      <Professionals />
      {/* --Footer-- */}
      <Footer />
    </>
  );
}

export default HomePage;
