import { Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "../pages/HomePage/HomePage";
import KlussenPage from "../pages/KlussenPage/KlussenPage";
import SpecialistPage from "../pages/Offertestraat-specialist/SpecialistPage";
import ResultsPage from "../pages/ResultsPage/ResultsPage";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import HowItWorksPage from "../pages/HowItWorksPage/HowItWorksPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import DisclaimerPage from "../pages/DisclaimerPage/DisclaimerPage";
import "./App.css";
import AlgemeneVoorwaarden from "../pages/AlgemeneVoorwaarden/AlgemeneVoorwaarden";
import PrivacyBeleid from "../pages/PrivacyBeleid/PrivacyBeleid";

function App() {
  axios.defaults.baseURL = "http://api-env.eba-2mt8abmc.eu-north-1.elasticbeanstalk.com/v1"
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
        <Route path="/disclaimer" element={<DisclaimerPage/>} />
        <Route path="/algemene-voorwaarden" element={<AlgemeneVoorwaarden/>} />
        <Route path="/privacybeleid" element={<PrivacyBeleid/>} />
      </Routes>
    </>
  );
}

export default App;
