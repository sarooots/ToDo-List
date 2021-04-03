import React, {Component, createRef} from "react"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {formatDate} from "../../helpers/utils"
import cls from "./Editor.module.sass"
import {addTask, editTask, editFailed} from "../../store/actions";
import {connect} from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faTimes} from "@fortawesome/free-solid-svg-icons"

class Editor extends Component {
  constructor(props) {
    super(props)
    const {mode} = this.props
    if (mode === "edit") {
      const {task} = props
      this.state = {
        ...task,
        date: task.date ? new Date(task.date) : new Date()
      }

    } else {
      this.state = {
        title: "",
        description: "",
        date: new Date(),
      }
    }
    this.focusedRef = createRef()
  }

  static propTypes = {
    task: PropTypes.object,
    mode: PropTypes.string.isRequired,
    toggleShow: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.focusedRef.current.focus()
  }

  changeTaskProperty = (event, property ) => {
    this.setState({[property]: event.target.value})
  }
  changeTaskDate = (value) => {
    this.setState({
      date: value || formatDate(new Date().toISOString())
    })
  }

  acceptButton = () => {
    const newTask = {...this.state}
    newTask.date = formatDate(newTask.date.toISOString())
    const {toggleShow, addTask, editTask, mode, from, editFailed} = this.props
    const action = mode==="new"? addTask:editTask
    if (newTask.title.trim() !==  "") {
      from === "single" ? action(newTask, from): action(newTask)
      toggleShow()
      if (mode === "new") {
        this.setState({title: "", description: ""})
      }
    }
    else {
      editFailed()
    }

  }

  render() {

    const {mode, toggleShow, show} = this.props
    return (
      <div className={`${cls.overlay} ${show? cls.show: cls.hide}`}>
        <div className={cls.modal}>
          <div className={cls.header}>
            <h4 className={cls.title}>{mode==="new"? "New task": "Edit task"}</h4>
            <span className={cls.closeModal} onClick={toggleShow}>
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </div>
          <div className={cls.body}>
            <div className={cls.field}>
              <input type="text"
                     className={cls.input}
                     ref={this.focusedRef}
                     placeholder="Add new task"
                     value={this.state.title}
                     onChange={(event) => {
                       this.changeTaskProperty(event, "title")
                     }}
              />
              <span>Task title</span>
            </div>
            <div className={cls.field}>
                <DatePicker
                  minDate={new Date()}
                  selected={this.state.date}
                  wrapperClassName={cls.datepicker}
                  onChange={this.changeTaskDate}
                  customInput={<input type="text" className={cls.input}/>}
                />
              <span>Deadline</span>
            </div>
            <div className={cls.field}>
              <textarea className={cls.input}
                        value={this.state.description}
                        placeholder="Write task description"
                        onChange={(event) => {this.changeTaskProperty(event, "description")}}>
                </textarea>
              <span>Description</span>

            </div>
          </div>
          <div className={cls.footer}>
            <button className={`${cls.button} ${mode === "new" ? cls.add : cls.save}`}
                    onClick={this.acceptButton}>
              {mode ==="new"?"add task":"save"}
            </button>
            <button className={`${cls.button} ${cls.cancel}`}
                    onClick={toggleShow}>
              Cancel
            </button>
          </div>
        </div>
      </div>

    )
  }
}
const mapDispatchToProps =  {
  addTask,
  editTask ,
  editFailed
}
export default connect(null, mapDispatchToProps)(Editor)
