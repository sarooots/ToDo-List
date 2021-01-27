import React, {PureComponent} from 'react'
import Header from './Header/Header'
import classes from './ToDo.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Container, Col, Row, Button, Card, ButtonGroup} from 'react-bootstrap'
import idGenerator from "../../helpers/idGenerator"
import moment from "moment"
import Editor from "./Editor"


class ToDo extends PureComponent {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        show: false,
        editTask: null,
        mode: 'new'
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
        const {tasks} = this.state
        const selectedTasks = new Set(this.state.selectedTasks)
        const newTask = tasks.filter((task)=>{
           return !selectedTasks.has(task._id)
        })
        this.setState({
            tasks: newTask,
            selectedTasks: new Set()
        })
    }

    selectAllTasks = () => {
        console.log('gago')
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

    addTask = task => {
        const {tasks} = this.state
        task._id = idGenerator()
        if (task.name.trim() !==  '') {
            this.setState({tasks: [...tasks, task], showNew: !this.state.showNew})
        }
    }

    editTask = (editedTask) => {
        const {tasks} = this.state
        if (editedTask.name.trim() !==  '') {
        const newList = tasks
        const editId = tasks.findIndex((el)=> el._id===editedTask._id)
        newList[editId] = editedTask
        this.setState({tasks: newList, showEdit: !this.state.showEdit})
        }
    }

    toggleShow = () => this.setState({show: !this.state.show})

    handleEdit = editTask => this.setState({ editTask,  show: !this.state.show})

    changeMode = newMode => this.setState({ mode: newMode})

    render() {
        const {tasks, selectedTasks, editTask, show, mode} = this.state
        return (
            <>
                {/*Here goes logo, 'new task' 'select/deselect' and 'delete' buttons*/}
                <Header
                    tasks={this.state.tasks}
                    selectedTasks={selectedTasks}
                    removeSelected={this.removeSelected}
                    // selectAllTasks={this.selectAllTasks}
                    selectAllTasks={this.selectAllTasks}
                    deselect={this.deselect}
                    toggleShow={this.toggleShow}
                    changeMode={this.changeMode}/>

                <Container  fluid className={classes.toDoList}>
                    <Row>
                        {
                            tasks.map((task)=>{
                                return (
                                    <Col key={task._id}
                                         lg={3}
                                         md={4}
                                         sm={6}
                                         xs={12}>
                                        <Card className={`${classes.task} ${selectedTasks.has(task._id)? classes.selected: ''}`}>
                                            <label  className={classes.select}>
                                                <input type="checkbox"
                                                       className={`${classes.select} rounded-0`}
                                                       onChange={()=> this.selectTask(task._id)}
                                                       checked={selectedTasks.has(task._id)}/>
                                                <span className={classes.checkmark}/>
                                                <div className={classes.fillWidth}/>

                                            </label>
                                            <Card.Body className={classes.cBody}>
                                                <Card.Title className={classes.title}>{task.name}</Card.Title>
                                                <Card.Subtitle className={`mb-2 text-muted ${classes.deadline}`}>{`deadline: ${moment(task.deadline).format("MMM Do YY")}`}</Card.Subtitle>
                                                <Card.Text className={`${classes.desc} ${task.desc ===''?classes.emptyDesc:''}`}>{task.desc === '' ? 'this task has no description': task.desc}</Card.Text>
                                                <ButtonGroup size="sm" className={classes.actions}>
                                                    <Button variant='dark'
                                                            onClick={() => {
                                                                this.handleEdit(task)
                                                                this.changeMode('edit')
                                                            }}
                                                            className="rounded-0 text-nowrap"
                                                            disabled={!!selectedTasks.size}>
                                                        <FontAwesomeIcon icon={faEdit} />
                                                    </Button>
                                                    <Button
                                                        disabled={!!selectedTasks.size}
                                                        variant='danger'
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
                    mode === 'edit' && show &&
                    <Editor
                        mode={mode}
                        show={show}
                        action={this.editTask}
                        selectedTasks={selectedTasks}
                        toggleShow={this.toggleShow}
                        task={editTask}/>
                }
                {
                    mode === 'new' && show &&
                    <Editor
                        mode={mode}
                        show={show}
                        action={this.addTask}
                        selectedTasks={selectedTasks}
                        toggleShow={this.toggleShow}/>
                }
            </>
        )
    }

}
export default ToDo