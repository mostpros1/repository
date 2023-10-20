import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Klussenpage from "../pages/Klussenpage/Klussenpage";
import Specialistpage from "../pages/Offertestraat-specialist/Specialistpage";
import Resultspage from "../pages/Resultspage/Resultspage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/klussen" element={<Klussenpage />} />
        <Route path="/inschrijven-als-specialist" element={<Specialistpage />} />
        <Route path="/specialist-resultaat" element={<Resultspage />} />
      </Routes>
    </>
  );
}

export default App;
