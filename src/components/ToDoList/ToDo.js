import React, {Component} from 'react'
import Header from './Header/Header'
import classes from './ToDo.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Container, Col, Row, Button, Card, ButtonGroup} from 'react-bootstrap'
import idGenerator from "../../helpers/idGenerator"
import moment from "moment"
import Editor from "./Editor"


class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showNew: false,
        showEdit: false,
        editTask: null
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
    removeTask = taskId => {
        const {tasks} = this.state
        this.setState({tasks: tasks.filter((task)=> taskId !== task._id)})
    }
    removeSelected = () => {
        const {selectedTasks, tasks} = this.state
        const newTask = tasks.filter((task)=>{
            if (selectedTasks.has(task._id)) {
                return false
            } else {
                return true
            }
        })
        this.setState({
            tasks: newTask,
            selectedTasks: new Set()
        })
    }
    selectAllTasks = () => {
        const {tasks, selectedTasks} = this.state
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
        const {selectedTasks} = this.state
        selectedTasks.clear()
        this.setState({selectedTasks: selectedTasks})

    }
    addTask = task => {
        const {tasks} = this.state
        task._id = idGenerator()
        if (task.name.trim() !==  '') {
            const newTask = task
            this.setState({tasks: [...tasks, newTask], showNew: !this.state.showNew})
        }
    }

    editTask = (editedTask) => {
        const {tasks} = this.state
        const newList = tasks
        const editId = tasks.findIndex((el)=> el._id===editedTask._id)
        newList[editId] = editedTask
        this.setState({tasks: newList, showEdit: !this.state.showEdit})
    }

    toggleShowNew = () => {
        this.setState({showNew: !this.state.showNew})
    }
    toggleShowEdit = () => {
        this.setState({showEdit: !this.state.showEdit})
    }

    handleEdit = (editTask)=>{
        this.setState({ editTask,  showEdit: !this.state.showEdit})
    };

    render() {
        const {tasks, selectedTasks, editTask, showNew, showEdit} = this.state
        return (
            <>
                {/*Here goes logo, 'new task' 'select/deselect' and 'delete' buttons*/}
                <Header
                    addTask={this.addTask}
                    tasks={this.state.tasks}
                    showNew={this.state.showNew}
                    selectedTasks={selectedTasks}
                    removeSelected={this.removeSelected}
                    selectAllTasks={this.selectAllTasks}
                    deselect={this.deselect}
                    toggleShowNew={this.toggleShowNew}

                />
                <Container  fluid className={classes.toDoList}>
                <Row className={classes.tasks}>
                    {
                        tasks.map((task,index)=>{
                            return (
                                <Col key={task._id}
                                     lg={3}
                                     md={4}
                                     sm={6}
                                     xs={12}
                                >
                                    <Card className={`${classes.task} ${selectedTasks.has(task._id)? classes.selected: ''}`}>
                                        <label  className={classes.select}>
                                            <input type="checkbox"
                                                   className={`${classes.select} rounded-0`}
                                                   onChange={()=> this.selectTask(task._id)}
                                                   checked={selectedTasks.has(task._id)}
                                            />
                                            <span className={classes.checkmark}></span>
                                            <div className={classes.fillWidth}></div>

                                        </label>
                                        <Card.Body className={classes.cBody}>
                                            <Card.Title className={classes.title}>{task.name}</Card.Title>
                                            <Card.Subtitle className={`mb-2 text-muted ${classes.deadline}`}>{`deadline: ${moment(task.deadline).format("MMM Do YY")}`}</Card.Subtitle>
                                            <Card.Text className={`${classes.desc} ${task.desc ===''?classes.emptyDesc:''}`}>{task.desc === '' ? 'this task has no description': task.desc}</Card.Text>
                                            <ButtonGroup size="sm" className={classes.actions}>
                                                <Button variant='dark' onClick={() => this.handleEdit(task)} className={`${classes.item} rounded-0 text-nowrap`} disabled={!!selectedTasks.size}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    disabled={!!selectedTasks.size}
                                                    variant='danger'
                                                    className={`${classes.removeTask} ${classes.action}`}
                                                    onClick={()=> this.removeTask(task._id)}
                                                > <FontAwesomeIcon icon={faTrash} />
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
                    showEdit &&
                    <Editor
                        mode='edit'
                        showEdit={showEdit}
                        selectedTasks={selectedTasks}
                        editTask={this.editTask}
                        task={editTask}
                        toggleShowEdit={this.toggleShowEdit}

                    />
                }
                {
                    showNew &&
                    <Editor
                        addTask={this.addTask}
                        showNew={showNew}
                        selectedTasks={selectedTasks}
                        toggleShowNew={this.toggleShowNew}
                        mode='new'
                    />
                }
            </>
        )
    }

}
export default ToDo