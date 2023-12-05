import "./MyTaskList.css"
import TaskCard from "./TaskCard"
import NewTaskButton from "./NewTaskButton"

function MyTaskList() {
    return (
        <div className="container">
            <div className="wrapper">
                <div className="mytask_con">
                    <div className="current_task_con">
                        <h2>Huidige klussen</h2>
                        <div className="taskCard_con">
                            <TaskCard />
                            <NewTaskButton />
                        </div>
                    </div>
                    <div className="finished_task_con">
                        <h2>Afgeronde klussen</h2>
                        <div className="taskCard_con">
                            <TaskCard />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default MyTaskList