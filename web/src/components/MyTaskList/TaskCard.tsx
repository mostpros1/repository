import "./TaskCard.css";
import placeholder from "../../assets/image 20.png";


function TaskCard({ title, taskNR, price, info, status }) {

    return (
        <div className={`myTaskCard ${status === "finish" ? "finished" : ""}`}>
            <div className="myTaskCard_left">
                <div className="myTaskCard_left_img_con">
                    <img src={placeholder} alt="placeholder" />
                </div>
                <div className="myTaskCard_left_text_con">
                    <p>{title}</p>
                    <p>Opdrachtnummer: {taskNR}</p>
                    <p>€{price},-</p>
                </div>
            </div>
            <div className="myTaskCard_right">
                <div className="myTaskCard_right_text_con">
                    <h3>Aanvullende informatie:</h3>
                    <p>{info}</p>
                </div>
                <a href="#" className="task_btn">
                    Bekijk klus
                </a>
            </div>
        </div>
    );
}

export default TaskCard;
