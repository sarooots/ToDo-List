import React, {useEffect, useState, useCallback} from "react"
import Editor from "../../Editor/Editor";
import {connect} from "react-redux";
import {getTask, deleteTask, editTask} from "../../../store/actions";
import Wrapper from "../../HOC Wrapper/Wrapper";
import cls from "./SingleTas.module.sass";
import {formatDate, formatDate2} from "../../../helpers/utils";
import moment from "moment";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faEdit, faRedo, faTrash} from "@fortawesome/free-solid-svg-icons";
import {history} from "../../../helpers/history";


function SingleTask ({getTask, task, article, match, deleteTask, editTask}) {

  const [show, setShow] = useState(false)
  useEffect(()=> {
    getTask(match.params.taskId)
  }, [getTask, match.params.taskId])

  const checkDate = useCallback((status) => {
    if (task) {
      // eslint-disable-next-line default-case
      switch (status) {
        case "expires": return moment(task.date) < moment()
        case "expired": return moment(task.date) < moment().subtract( 1, "day")
      }
    }
  }, [task])

  const expires = checkDate("expires")
  const expired = checkDate("expired")

  const toggleShow = () => setShow(!show)

  return task && <>
    <section className={cls.wrapper}>
      {/*first section of page, intro*/}
      <article className={`${article} ${cls.article}`}>
        <div className={`
        ${cls.task} 
        ${expires? cls.expires:""} 
        ${expired? cls.expired:""}
        ${task.status ==="done"? cls.done:""}
        `}>
          <h4 className={cls.title}>
            {task.title}
          </h4>
          <h6 className={`
          ${cls.details}
          ${expired ? cls.expired:""} 
          ${expires ? cls.expires:""} 
          `}>
              <span className={cls.detail}>
                {expired ? "Expired: ": "Deadline: " }
                <span className={cls.date}>
                  {expired ? formatDate2(task.date): (expires ? "Today" : formatDate2(task.date))}
                </span>
              </span>
            <span className={cls.detail}>
                Created:
                <span className={cls.date}>
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
          <h6 className={`${cls.details} ${cls.desc}`}>
            Description:
          </h6>
          <p className={`${cls.description} ${task.description === "" ? cls.empty:""}`}>
            {task.description === "" ? "this task has no description": task.description}
          </p>
          <div className={cls.actions}>

            <div
              className={`${cls.action} ${cls.changeStatus}`}
              onClick={() => {
                //toggle task status
                task.status = task.status === "active"? "done": "active"
                //creates Date object from string, then creates new string in required format from that Date object
                task.date=  formatDate(new Date(task.date).toISOString())
                //the last argument is for specifying the action is called to change only task status
                editTask(task, "single", true)
              }}
            >
              <span>{ task.status === "done" ? "Activate": "Complete"}</span>
              <FontAwesomeIcon icon={ task.status === "done" ? faRedo: faCheck} />
            </div>
            <div
              className={`${cls.action} ${cls.edit}`}
              onClick={toggleShow}
            >
              <span>Edit</span>
              <FontAwesomeIcon icon={faEdit} />
            </div>

            <div
              className={`${cls.action} ${cls.delete}`}
              onClick={() => {
                deleteTask(task._id)
                history.push("/tasks")
              }}
            >
              <span>Delete</span>
              <FontAwesomeIcon icon={faTrash} />
            </div>

          </div>
        </div>
      </article>
    </section>
    {
      show &&
      <Editor
        mode='edit'
        show={show}
        from="single"
        toggleShow={toggleShow}
        task={task}/>
    }
  </>
}



const mapStateToProps = (state)=> {
  return {task: state.task}
}

const mapDispatchToProps = {
  getTask,
  deleteTask,
  editTask
}

export default Wrapper(connect(mapStateToProps, mapDispatchToProps)(SingleTask))