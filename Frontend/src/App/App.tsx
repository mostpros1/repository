import { Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage/Homepage";
import Testpage from "../pages/Testpage/Testpage";
import Klussenpage from "../pages/Klussenpage/Klussenpage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/testpage" element={<Testpage />} />
        <Route path="/klussen" element={<Klussenpage />} />
      </Routes>
    </>
  );
}

export default App;
