import React, {Component} from "react"
import Actions from "./Actions"
import classes from "./ToDo.module.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import {Container, Col, Row, Button, Card, ButtonGroup} from "react-bootstrap"
import {formatDate, stringTrimmer} from "../../../helpers/utils"
import request from "../../../helpers/request"
import Editor from "../../Editor/Editor"
import {Link} from "react-router-dom"
import {connect} from "react-redux";


class ToDo extends Component {
    state = {
        selectedTasks: new Set(),
        show: false,
        editTask: null,
        mode: "new"
    }

    componentDidMount() {
        this.props.getTasks()
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

    removeTask = taskId => this.props.removeTask(taskId)

    removeSelected = () => {
        this.props.removeSelected(this.state.selectedTasks)
        this.setState({
            selectedTasks: new Set()
        })
    }

    selectAllTasks = () => {
        const {tasks} = this.state
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

    addTask = task => this.props.addTask(task)


    editTask = editedTask => {
        this.props.editTask(editedTask)
    }

    toggleShow = () => this.setState({show: !this.state.show})

    handleEdit = editTask => this.setState({ editTask,  show: !this.state.show})

    changeMode = newMode => this.setState({ mode: newMode})

    render() {
        const {selectedTasks, editTask, show, mode} = this.state
        const {tasks} = this.props
        return (
            <>
                {/*Here goes logo, "new task" "select/deselect" and "delete" buttons*/}
                <Container  fluid className={classes.toDoList}>
                    <Actions
                        tasks={this.props.tasks}
                        selectedTasks={selectedTasks}
                        removeSelected={this.removeSelected}
                        selectAllTasks={this.selectAllTasks}
                        deselect={this.deselect}
                        toggleShow={this.toggleShow}
                        changeMode={this.changeMode}/>

                    <Row>
                        {
                            tasks.map((task)=>{
                                return (
                                    <Col key={task._id}
                                         lg={3}
                                         md={4}
                                         sm={6}
                                         xs={12}>
                                        <Card className={`${classes.task} ${selectedTasks.has(task._id)? classes.selected: ""}`}>
                                            <label  className={classes.select}>
                                                <input type="checkbox"
                                                       className={`${classes.select} rounded-0`}
                                                       onChange={()=> this.selectTask(task._id)}
                                                       checked={selectedTasks.has(task._id)}/>
                                                <span className={classes.checkmark}/>
                                                <div className={classes.fillWidth}/>

                                            </label>
                                            <Card.Body className={classes.cBody}>
                                                <Link to={`/task/${task._id}`}>
                                                    <Card.Title className={classes.title}>{task.title}</Card.Title>
                                                </Link>
                                                <Card.Subtitle className={`mb-2 text-muted ${classes.date}`}>{`date: ${formatDate(task.date)}`}</Card.Subtitle>
                                                <Card.Text className={`${classes.desc} ${task.description ===""?classes.emptyDesc:""}`}>
                                                    {task.description === "" ? "this task has no description": stringTrimmer(task.description, 55)}
                                                </Card.Text>
                                                <ButtonGroup size="sm" className={classes.actions}>
                                                    <Button variant="success"
                                                            onClick={() => {
                                                                this.handleEdit(task)
                                                                this.changeMode("edit")
                                                            }}
                                                            className="rounded-0 text-nowrap"
                                                            disabled={!!selectedTasks.size}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button
                                                        disabled={!!selectedTasks.size}
                                                        variant="danger"
                                                        onClick={()=> this.removeTask(task._id)}>
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </Button>
                                                </ButtonGroup>
                                            </Card.Body>
                                        </Card>
                                    </Col>
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
                        action={this.editTask}
                        toggleShow={this.toggleShow}
                        task={editTask}/>
                }
                {
                    mode === "new" && show &&
                    <Editor
                        mode={mode}
                        show={show}
                        action={this.addTask}
                        toggleShow={this.toggleShow}/>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        tasks: state.tasks
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getTasks: () =>{
            request("http://localhost:3001/task")
                .then((res)=>{
                    dispatch({type: "GET_TASKS", tasks: res})
                })
        },
        removeTask: (taskId) => {
            request(`http://localhost:3001/task/${taskId}`, "DELETE")
                .then(()=>{
                    dispatch({type: "REMOVE_TASK", taskId})
                })
        },
        removeSelected: (selectedTasks) =>{
            request(`http://localhost:3001/task/`,"PATCH", {tasks: Array.from(selectedTasks)})
                .then( ()=>{
                    dispatch({type: "REMOVE_SELECTED", selectedTasks})
                })
        },
        addTask: (task) => {
            request("http://localhost:3001/task", "POST", task)
                .then((res)=>{
                    dispatch({type: "ADD_TASK", task: res})
                })
        },
        editTask: (editedTask)=>{
            request(`http://localhost:3001/task/${editedTask._id}`, "PUT", editedTask)
                .then((res)=>{
                    dispatch({type: "EDIT_TASK", editedTask: res })
                })

        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToDo)