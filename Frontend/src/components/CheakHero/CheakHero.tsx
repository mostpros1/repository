import "./CheakHero.css";
import Cheakman from "../../assets/checkman.png";
function CheakHero() {
  return (
    <>
      <div className="CheakHero_container">
        <div className="CheakHero_midden">
          <h2>midden</h2>
        </div>
        <div className="CheakHero_right">
          <img src={Cheakman} alt="Cheakman" className="Cheakman" />
        </div>
      </div>
    </>
  );
}

export default CheakHero;