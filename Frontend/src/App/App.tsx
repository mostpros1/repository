import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import KlussenPage from "../pages/KlussenPage/KlussenPage";
import SpecialistPage from "../pages/Offertestraat-specialist/SpecialistPage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import HowItWorksPage from "../pages/HowItWorksPage/HowItWorksPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/klussen" element={<KlussenPage />} />
        <Route path="/inschrijven-als-specialist" element={<SpecialistPage />} />
        <Route path="/specialist-resultaat" element={<ResultsPage />} />
        <Route path="/over-ons" element={<AboutUsPage />} />
        <Route path="/hoe-werkt-het" element={<HowItWorksPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

export default App;
