import "./MyTaskList.css"
import TaskCard from "./TaskCard"

function MyTaskList() {
    return (
        <div className="container">
            <div className="wrapper">
                <div className="mytask_con">
                    <div className="current_task_con">
                        <h2>Huidige klussen</h2>
                        <div className="task-card-con">
                            <TaskCard />
                        </div>
                    </div>
                    <div className="finished_task_con">
                        <h2>Afgeronde klussen</h2>
                        <div className="task-card-con">
                            <TaskCard />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default MyTaskList