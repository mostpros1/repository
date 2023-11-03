import "./ChoresDesc.css";
import handyman from "../../assets/handyman.png";
import painter from "../../assets/stefano-manzini-B81670AyocM-unsplash.jpg";
import floors from "../../assets/ddp-kS1UuxzkuJE-unsplash.jpg";
import { Link } from "react-router-dom";

function ChoresDesc() {
  return (
    <>
      <div className="chores_con">
        <div className="title_container">
          <h2>Vind vakmensen voor elke klus</h2>
        </div>
        <div className="choresCard_con">
          <Link to="/klussen">
            <div className="choreCard">
              <div className="choreImg_con">
                <img src={handyman} alt="" />
              </div>
              <div className="chore_desc">
                <h4>Loodgieterswerk</h4>
                <a href="$">Alle informatie over Loodgieters</a>
              </div>
            </div>
          </Link>
          <Link to="/klussen">
            <div className="choreCard">
              <div className="choreImg_con">
                <img src={painter} alt="" />
              </div>
              <div className="chore_desc">
                <h4>Schilderen</h4>
                <a href="$">Alle informatie over Schilders</a>
              </div>
            </div>
          </Link>
          <Link to="/klussen">
            <div className="choreCard">
              <div className="choreImg_con">
                <img src={floors} alt="" />
              </div>
              <div className="chore_desc">
                <h4>Vloeren en tegels</h4>
                <a href="$">Alle informatie over Tegelzetters</a>
              </div>
            </div>
          </Link>
        </div>
        <div className="button_container">
          <button className="button">Meer bekijken</button>
        </div>
      </div>
    </>
  );
}

export default ChoresDesc;
