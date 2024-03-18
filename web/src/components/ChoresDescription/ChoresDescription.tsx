import "./ChoresDescription.css";
import handyman from "../../assets/handyman.png";
import painter from "../../assets/stefano-manzini-B81670AyocM-unsplash.jpg";
import floors from "../../assets/ddp-kS1UuxzkuJE-unsplash.jpg";
import { Link } from "react-router-dom";

function ChoresDescription() {
  return (
    <>
      <div className="chores_con">
        <div className="title_container">
          <h2>Vind vakmensen voor elke klus</h2>
        </div>
        <div className="choresCard_con">
            <div className="choreCard">
              <div className="choreImg_con">
                <img src={handyman} alt="" />
              </div>
              <div className="chore_description">
                <h4>Loodgieterswerk</h4>
              </div>
            </div>
            <div className="choreCard">
              <div className="choreImg_con">
                <img src={painter} alt="" />
              </div>
              <div className="chore_description">
                <h4>Schilderen</h4>
              </div>
            </div>      
            <div className="choreCard">
              <div className="choreImg_con">
                <img src={floors} alt="" />
              </div>
              <div className="chore_description">
                <h4>Vloeren en tegels</h4>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default ChoresDescription;
