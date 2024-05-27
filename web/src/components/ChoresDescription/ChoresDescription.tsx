import "./ChoresDescription.css";
import handyman from "../../assets/handyman.png";
import painter from "../../assets/stefano-manzini-B81670AyocM-unsplash.jpg";
import floors from "../../assets/ddp-kS1UuxzkuJE-unsplash.jpg";
import { Link } from "react-router-dom";

function ChoresDescription() {
  return (
    <>
      <article className="chores_con">
        <article className="title_container">
          <h2>Vind vakmensen voor elke klus</h2>
        </article>
        <article className="choresCard_con">
            <article className="choreCard">
              <article className="choreImg_con">
                <img src={handyman} alt="" />
              </article>
              <article className="chore_description">
                <h4>Loodgieterswerk</h4>
              </article>
            </article>
            <article className="choreCard">
              <article className="choreImg_con">
                <img src={painter} alt="" />
              </article>
              <article className="chore_description">
                <h4>Schilderen</h4>
              </article>
            </article>      
            <article className="choreCard">
              <article className="choreImg_con">
                <img src={floors} alt="" />
              </article>
              <article className="chore_description">
                <h4>Vloeren en tegels</h4>
              </article>
            </article>
        </article>
      </article>
    </>
  );
}

export default ChoresDescription;
