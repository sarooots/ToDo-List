import React from "react"
import cls from "./Task.module.sass"
import {formatDate, formatDate2, stringTrimmer} from "../../../../helpers/utils"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit, faTrash, faCheck, faRedo} from "@fortawesome/free-solid-svg-icons"
import {deleteTask, editTask} from "../../../../store/actions"
import {connect} from "react-redux"
import moment from "moment";




function Task ({task, selectTask, selectedTasks, handleEdit, changeMode, deleteTask, editTask}) {
  let expires = moment(task.date) < moment()
  let expired = moment(task.date) < moment().subtract( 1, "day")
  return (

    // please check "Task.module.sass" file to understand each element of the code
    // there are elements which is necessary for styling

    <div className={`${cls.task}
         ${selectedTasks.has(task._id) && cls.selected}
         ${task.status === "done" && cls.done}
         ${task.status === "active" && expires && cls.expires}
         ${expired && cls.expired}
         `}>

      <div className={cls.item}>
        {/*select task checkbox*/}
        <label>
          <div
            className={`${cls.action} ${cls.select}`}
          >
            <input type="checkbox"
                   onChange={()=> selectTask(task._id)}
                   checked={selectedTasks.has(task._id)}
            />
            <span className={`${cls.checkbox}`}/>
          </div>
        </label>


        {/*task info
            all information placed in Link element to make whole task info clickable
            */}

        <Link to={`/task/${task._id}`} className={cls.link}>
          <div className={cls.content}>
            <h2 className={cls.title}>  {stringTrimmer(task.title, 115)}</h2>
            <h6 className={cls.details}>
              <span className={cls.detail}>
                {expired ? "Expired: ": "Deadline: " }
                <span className={cls.date}>
                  {expired ? formatDate2(task.date): (expires? "Today" : formatDate2(task.date))}
                </span>
              </span>
              <span className={cls.detail}>
                Created:
                <span>
                  {` ${formatDate2(task.created_at)}`}
                </span>
              </span>
              <span className={cls.detail}>
                Status:
                <span className={cls.status}>
                  {` ${task.status}`}
                </span>
              </span>
            </h6>
            <p
              className={`${cls.description} ${task.description === ""? cls.empty: ""}`}
            >
              {task.description === "" ? "this task has no description": stringTrimmer(task.description, 300)}
            </p>
          </div>
        </Link>
      </div>

      {/*task action buttons*/}
      <div className={cls.item}>
        <div
          className={`${cls.action} ${cls.edit}`}
          onClick={() => {
            handleEdit(task)
            changeMode("edit")
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
        </div>
        <div
          className={`${cls.action} ${cls.delete}`}
          onClick={() => deleteTask(task._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className={`${cls.action} ${cls.changeStatus}`}
          onClick={() => {
            //toggle task status
            task.status = task.status === "active"? "done": "active"
            //creates Date object from string, then creates new string in required format from that Date object
            task.date=  formatDate(new Date(task.date).toISOString())

            //the last argument is for specifying the action is called to change only task status
            editTask(task, null, true)
          }}
        >
          <FontAwesomeIcon icon={ task.status === "done" ? faRedo: faCheck} />
        </div>

      </div>
    </div>

  )
}

export function TaskPreview ({task}) {
  return (
    // please check "Task.module.sass" file to understand each element of the code
    // there are elements which is necessary for styling
    <div className={`${cls.task}
         `}>
      <div className={cls.item}>
        <div className={cls.link}>
          <div className={cls.content}>
            <h2 className={cls.title}>  {stringTrimmer(task.title, 115)}</h2>
            <h6 className={cls.details}>
              <span className={cls.detail}>
                Deadline:
                <span className={cls.date}>
                  {formatDate2(task.date)}
                </span>
              </span>
              <span className={cls.detail}>
                Created:
                <span>
                  {`${formatDate2(task.created_at)}`}
                </span>
              </span>
              <span className={cls.detail}>
                Status:
                <span className={cls.status}>
                  {` ${task.status}`}
                </span>
              </span>
            </h6>
            <p
              className={`${cls.description}`}
            >
              {task.description }
            </p>
          </div>
        </div>
      </div>

      {/*task action buttons*/}
      <div className={cls.item}>
        <div
          className={`${cls.action} ${cls.edit}`}
        >
          <FontAwesomeIcon icon={faEdit} />
        </div>
        <div
          className={`${cls.action} ${cls.delete}`}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
        <div
          className={`${cls.action} ${cls.changeStatus}`}
        >
          <FontAwesomeIcon icon={ task.status === "done" ? faRedo: faCheck} />
        </div>

      </div>
    </div>

  )
}


// editTask and deleteTask action given to this component as props
const mapDispatchToProps =  {
  editTask,
  deleteTask
}

export default connect(null, mapDispatchToProps)(Task)