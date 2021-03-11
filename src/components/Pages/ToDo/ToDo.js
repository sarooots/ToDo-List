import React, {Component} from "react"
import Actions from "./Actions"
import classes from "./ToDo.module.sass"
import {Container, Row} from "react-bootstrap"
import Editor from "../../Editor/Editor"
import {connect} from "react-redux";
import {getTasks, deleteTask} from "../../../store/actions"
import {history} from "../../../helpers/history"
import Task from "./Task"


class ToDo extends Component {
    state = {
        selectedTasks: new Set(),
        show: false,
        editTask: null,
        mode: "new"
    }

    componentDidMount() {
        this.props.getTasks(history.location.search)
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
        this.setState({selectedTasks: selectedTasks})

    }

    deselect = () => {
        const selectedTasks = new Set(this.state.selectedTasks)
        selectedTasks.clear()
        this.setState({selectedTasks: selectedTasks})
    }


    toggleShow = () => this.setState({show: !this.state.show})

    handleEdit = editTask => this.setState({ editTask,  show: !this.state.show})

    changeStatus = editTask => this.setState({ editTask,  show: !this.state.show})

    changeMode = newMode => this.setState({ mode: newMode})

    render() {
        const {selectedTasks, editTask, show, mode} = this.state
        const {tasks, deleteTask} = this.props
        return (
            <>
                {/*Here goes logo, "new task" "select/deselect" and "delete" buttons*/}
                <Container  fluid className={classes.toDoList}>
                    <Actions
                        tasks={this.props.tasks}
                        selectedTasks={selectedTasks}
                        selectAllTasks={this.selectAllTasks}
                        deselect={this.deselect}
                        toggleShow={this.toggleShow}
                        changeMode={this.changeMode}/>

                    <Row>
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
                    </Row>
                </Container>
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
    getTasks,
    deleteTask
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo)