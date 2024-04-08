import "./TaskCard.css";
import Icon from "../../../assets/kraan.svg";

const TaskCard = () => {
    return (
    <main className="maincards">
    {/* <!-- Task Card --> */}
    <a className="current-task-title">Huidige Klussen</a>
    <div className="task-card">
      <h3 className="task-title">
        Loodgieters werk: nieuwe leiding aanleggen
      </h3>
      <div className="task-detail">
        <h4>Beschrijving</h4>
        <p>
          <span>Opdrachtnummer:</span> 234561
        </p>

        <h5>Type Klus</h5>

        <div className="type-klus">
          <img src={Icon} alt="Klus Icon" className="klus-icon" />
          <span>Nieuwe leiding aanleggen</span>
        </div>
        <h5>Aanvullende informatie:</h5>
        <p>
          De leiding in de keuken, badkamer en in de tuin moeten aangelegd
          worden. Er is geen schade in de keuken en badkamer. Er is wel
          schade in de tuin waar de leiding momenteel is.
        </p>
      </div>
      <button className="task-button">Klus bekijk</button>
    </div>

    {/* <!-- New Task Card Search --> */}
  </main>

)};

export default TaskCard;