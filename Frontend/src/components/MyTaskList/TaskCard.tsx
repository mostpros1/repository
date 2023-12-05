import "./TaskCard.css"
import placeholder from "../../assets/image 20.png"

function TaskCard() {

    let taskCards = [
        {
            id: 1,
            title: "nieuwe leiding aanleggen",
            taskNR: 234561,
            price: 45,
            info: "De leiding in de keuken, badkamer en in de tuin moeten aangelegd worden. Er is geen schade in de keuken en badkamer. Er is wel schade in de tuin waar de leiding momenteel is.",
        },
        {
            id: 2,
            title: "Tegels aanleggen",
            taskNR: 765561,
            price: 413,
            info: "De leiding in de keuken, badkamer en in de tuin moeten aangelegd worden.",
        },
        {
            id: 3,
            title: "Plafond verven",
            taskNR: 923461,
            price: 26,
            info: "De leiding in de keuken. Er is wel schade in de tuin waar de leiding momenteel is.",
        },

    ]

    let taskCardsRender = taskCards.map((taskCard) => {
        return (
            <div key={taskCard.id} className="myTaskCard">
                <div className="myTaskCard_left">
                    <div className="myTaskCard_left_img_con">
                        <img src={placeholder} alt="placeholder" />
                    </div>
                    <div className="myTaskCard_left_text_con">
                        <p>Loodgieters werk: {taskCard.title}</p>
                        <p>Opdrachtnummer: {taskCard.taskNR}</p>
                        <p>€{taskCard.price},-</p>
                    </div>
                </div>
                <div className="myTaskCard_right">
                    <div className="myTaskCard_right_text_con">
                        <h3>Aanvullende informatie:</h3>
                        <p>{taskCard.info}</p>
                    </div>
                    <a href="#" className="task_btn">Bekijk klus</a>
                </div>
            </div>
        )
    })

    return (
        <>
            {taskCardsRender}
        </>
    )
}

export default TaskCard