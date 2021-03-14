import React, {Component} from "react"
import Search from "./Search"
import cls from "./ToDo.module.sass"
import Editor from "../../Editor/Editor"
import {connect} from "react-redux";
import {deleteTask} from "../../../store/actions"
import Task from "./Task"
import illustration from "../../Style assets/Tasks page illustration.svg"


class ToDo extends Component {
  state = {
    selectedTasks: new Set(),
    show: false,
    editTask: null,
    mode: "new"
  }

  componentDidUpdate(prevpProps) {
    if (!prevpProps.addTaskSuccess && this.props.addTaskSuccess) {
      this.setState({show: false})
    }
    if (!prevpProps.deleteTaskSuccess && this.props.deleteTaskSuccess) {
      this.setState({selectedTasks: new Set()})
    }
    if (!prevpProps.editTaskSuccess && this.props.editTaskSuccess) {
      this.setState({editTask: null})
    }
  }

  selectTask = taskId => {
    const selectedTasks = new Set(this.state.selectedTasks)
    if (selectedTasks.has(taskId)) {
      selectedTasks.delete(taskId)
    } else {
      selectedTasks.add(taskId)
    }
    this.setState({selectedTasks})
  }

  selectAllTasks = () => {
    const {tasks} = this.props
    const selectedTasks = new Set(this.state.selectedTasks)
    if (selectedTasks.size < tasks.length) {
      tasks.map((task)=>{
        return selectedTasks.add(task._id)
      })
    } else {
      selectedTasks.clear()
    }
    this.setState({selectedTasks})

  }

  deselect = () => {
    const selectedTasks = new Set(this.state.selectedTasks)
    selectedTasks.clear()
    this.setState({selectedTasks})
  }

  inverseSelection = () => {
    const selectedTasks = new Set(this.state.selectedTasks)
    const invertedTasks = new Set()
    this.props.tasks.forEach((task)=>{
      for (const [key, value] of Object.entries(task)) {
        key === "_id" && selectedTasks.size && !selectedTasks.has(value) && invertedTasks.add(value)
      }
    })
    this.setState({selectedTasks:invertedTasks})
  }


  toggleShow = () => this.setState({show: !this.state.show})

  handleEdit = editTask => this.setState({ editTask,  show: !this.state.show})

  changeMode = newMode => this.setState({ mode: newMode})

  render() {
    const {selectedTasks, editTask, show, mode} = this.state
    const {tasks} = this.props
    return (
      <>
        {/*whole page content*/}
        <section className={cls.wrapper}>
          {/*first section of page, intro*/}
          <article className={`${cls.intro} ${cls.article}`}>
            <div className={`${cls.introItem}`}>
              <img src={illustration} alt=""
                   className={`${cls.illustration}`}
              />
            </div>

            <div className={`${cls.introItem} ${cls.introInfo}`}>
              <h1 className={`${cls.introTitle}`}>Manage your tasks</h1>

              <ul className={`${cls.list}`}>
                <li>add task</li>
                <li>edit task</li>
                <li>delete single or multiple tasks</li>
                <li>search and filter tasks</li>
                <li>sort tasks</li>
                <li>change task status</li>
              </ul>
            </div>
          </article>

          <article className={`${cls.article} ${cls.actions}`}>
            <Search
              tasks={this.props.tasks}
              selectedTasks={selectedTasks}
              selectAllTasks={this.selectAllTasks}
              deselect={this.deselect}
              toggleShow={this.toggleShow}
              changeMode={this.changeMode}
              inverseSelection={this.inverseSelection}
              deleteTasks={deleteTasks}
            />
          </article>

          <article className={`${cls.article} ${cls.tasks}`}>

            {
              tasks.map((task, index)=>{
                return (
                  <Task
                    key={index}
                    task={task}
                    selectTask={this.selectTask}
                    selectedTasks={selectedTasks}
                    handleEdit={this.handleEdit}
                    changeMode={this.changeMode}
                    deleteTask={deleteTask}
                  />
                )
              })
            }
          </article>

        </section>
        {
          mode === "edit" && show &&
          <Editor
            mode={mode}
            show={show}
            toggleShow={this.toggleShow}
            task={editTask}/>
        }
        {
          mode === "new" && show &&
          <Editor
            mode={mode}
            show={show}
            toggleShow={this.toggleShow}/>
        }
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    tasks: state.tasks,
    addTaskSuccess: state.addTaskSuccess,
    deleteTaskSuccess: state.deleteTaskSuccess,
  }
}
const mapDispatchToProps =  {
  deleteTask
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo)