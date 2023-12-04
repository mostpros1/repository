import "./TaskCard.css"
import placeholder from "../../assets/image 20.png"

function TaskCard() {
    return (
        <div className="myTaskCard">
            <div className="myTaskCard_left">
                <div className="myTaskCard_left_img_con">
                    <img src={placeholder} alt="placeholder" />
                </div>
                <div className="myTaskCard_text_con">
                    <p>Loodgieters werk: nieuwe leiding aanleggen</p>
                    <p>Opdrachtnummer: 234561</p>
                    <p>€45,-</p>
                </div>
            </div>
            <div className="myTaskCard_right">
                <div className="myTaskCard_right_text_con">
                    <h3>Aanvullende informatie:</h3>
                    <p>De leiding in de keuken, badkamer en in de tuin moeten aangelegd worden. Er is geen schade in de keuken en badkamer. Er is wel schade in de tuin waar de leiding momenteel is.</p>
                </div>
                <div>Bekijk klus</div>
            </div>
        </div>
    )
}

export default TaskCard