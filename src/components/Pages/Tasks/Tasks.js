import React, {Component} from "react"
import Filters from "./Filters/Filters"
import cls from "./Tasks.module.sass"
import Editor from "../../Editor/Editor"
import {connect} from "react-redux";
import {deleteTask} from "../../../store/actions"
import Task from "./Task/Task"
import Wrapper from "../../HOC Wrapper/Wrapper"


class Tasks extends Component {
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
    const {tasks} = this.props
    tasks.forEach((task)=>{
      for (const [key, value] of Object.entries(task)) {
        key === "_id" && selectedTasks.size && !selectedTasks.has(value) && invertedTasks.add(value)
      }
    })

    selectedTasks.size < tasks.length && this.setState({selectedTasks:invertedTasks})
  }


  toggleShow = () => this.setState({show: !this.state.show})

  handleEdit = editTask => this.setState({ editTask,  show: !this.state.show})

  changeMode = newMode => this.setState({ mode: newMode})

  render() {
    const {selectedTasks, editTask, show, mode} = this.state
    const {tasks, article} = this.props
    return (
      <>
        {/*whole page content*/}
        <section className={cls.wrapper}>
          {/*first section of page, intro*/}
          <article className={`${article} ${cls.actions}`}>
            <Filters
              selectedTasks={selectedTasks}
              selectAllTasks={this.selectAllTasks}
              deselect={this.deselect}
              toggleShow={this.toggleShow}
              changeMode={this.changeMode}
              inverseSelection={this.inverseSelection}
            />
            <div className={cls.tasks}>
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
            </div>
          </article>

        </section>
        {
          mode === "edit" && show &&
          <Editor
            mode={mode}
            toggleShow={this.toggleShow}
            task={editTask}/>
        }
        {
          mode === "new" && show &&
          <Editor
            mode={mode}
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
export default Wrapper(connect(mapStateToProps, mapDispatchToProps)(Tasks))