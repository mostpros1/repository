import "../MyTaskList/TaskCard.css";
import TaskCard from "../MyTaskList/TaskCard";
import DashboardTaskButton from "../ui/DashboardTaskButton/DashboardTaskButton";

function HoTaskList() {
    let taskCards = [
        {
            id: 1,
            title: "nieuwe leiding aanleggen",
            status: "finished",
            taskNR: 234561,
            price: 45,
            info: "De leiding in de keuken, badkamer en in de tuin moeten aangelegd worden. Er is geen schade in de keuken en badkamer. Er is wel schade in de tuin waar de leiding momenteel is.",
        },
        {
            id: 2,
            title: "Tegels aanleggen",
            status: "ongoing",
            taskNR: 765561,
            price: 413,
            info: "De leiding in de keuken, badkamer en in de tuin moeten aangelegd worden.",
        },
        {
            id: 3,
            title: "Plafond verven",
            status: "ongoing",
            taskNR: 923461,
            price: 26,
            info: "De leiding in de keuken. Er is wel schade in de tuin waar de leiding momenteel is.",
        },

    ]

    // Filter task cards based on status
    let ongoingTasks = taskCards.filter((taskCard) => taskCard.status === "ongoing");
    let finishedTasks = taskCards.filter((taskCard) => taskCard.status === "finished");

    return (
        <div className="container">
            <div className="wrapper">
                <div className="mytask_con">
                    <div className="current_task_con">
                        <h2>Huidige klussen</h2>
                        <div className="taskCard_con">
                            {/* Render task cards with status "ongoing" */}
                            {ongoingTasks.map((taskCard) => (
                                <TaskCard key={taskCard.id} {...taskCard} />
                            ))}
                            <DashboardTaskButton />
                        </div>
                    </div>
                    <div className="finished_task_con">
                        <h2>Afgeronde klussen</h2>
                        <div className="taskCard_con">
                            {/* Render task cards with status "finish" */}
                            {finishedTasks.map((taskCard) => (
                                <TaskCard key={taskCard.id} {...taskCard} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HoTaskList;
