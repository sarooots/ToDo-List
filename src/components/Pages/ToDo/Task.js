import React from "react"
import cls from "./Task.module.sass"
import {formatDate2, stringTrimmer} from "../../../helpers/utils"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"


export default function Task ({task, selectTask, selectedTasks, handleEdit, changeMode, deleteTask}) {
    return (
        <div className={cls.task}>
            <label>
                <input type="checkbox"
                       onChange={()=> selectTask(task._id)}
                       checked={selectedTasks.has(task._id)}
                />
                <span/>
            </label>

            {/*task details*/}

            <Link to={`/task/${task._id}`} className={cls.link}>
                <div className={cls.content}>
                    <h2 className={cls.title}>  {stringTrimmer(task.title, 150)}</h2>
                    <h6 className={cls.details}>
                        <span className={cls.detail}>
                            Deadline:
                            <span className={cls.date}>
                                {` ${formatDate2(task.date)}`}
                            </span>
                        </span>
                                <span className={cls.detail}>
                            Status:
                            <span className={cls.status}>
                                {` ${task.status}`}
                            </span>
                        </span>
                    </h6>
                    <p>
                        {task.description === "" ? "this task has no description": stringTrimmer(task.description, 300)}
                    </p>
                </div>
            </Link>

            <div
                onClick={() => {
                    handleEdit(task)
                    changeMode("edit")
                }}
            >
                <FontAwesomeIcon icon={faEdit} />
            </div>
            <div
                onClick={() => deleteTask(task._id)}
            >
                <FontAwesomeIcon icon={faTrash} />
            </div>
        </div>



    )
}