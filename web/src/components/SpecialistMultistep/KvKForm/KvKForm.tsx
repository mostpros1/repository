import "./KvKForm.css";
import { Link } from "react-router-dom";

function KvKForm({ setShowNoKvK }) {
  return (
    <div className="KvKForm_con">
      <h2>Bedrijf-situatie</h2>
      <p>Wat is de naam van je bedrijf?</p>
      <div className="KvK_inputs">
        <div className="KvK_input">
          <label htmlFor="">Bedrijf naam</label>
          <input type="text" placeholder="Bedrijfsnaam" />
        </div>
        <div className="KvK_input">
          <label htmlFor="">KvK nummer:</label>
          <input type="text" placeholder="Uw KvK nummer" />
        </div>
      </div>
      <div className="No_KvK">
        <Link to="#" onClick={() => setShowNoKvK(true)}>
          Ik heb geen KVK-nummer
        </Link>
      </div>
    </div>
  );
}

export default KvKForm;
