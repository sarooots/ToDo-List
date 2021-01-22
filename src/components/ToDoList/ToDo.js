import React, {Component} from 'react'
import Header from './Header/Header'
import classes from './ToDo.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Container, Col, Row, Button, Card, ButtonGroup, Modal, Form} from 'react-bootstrap'
import idGenerator from "../../helpers/idGenerator"
import moment from "moment"


class ToDo extends Component {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        editMode: false
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
            this.setState({tasks: [...tasks, newTask]})
        }
    }

    editTask = (id) => {
        const {editMode, tasks} = this.state
        const tempList = tasks
        tempList.findIndex()
        console.log('edit works')
        this.setState({editMode: !editMode})
        return ''
    }

    render() {
        const {tasks, selectedTasks, editMode} = this.state
        const selectTask = this.selectTask
        const removeTask = this.removeTask
        const editTask = this.editTask
        return (
            <>
                {/*Here goes logo, 'new task' 'select/deselect' and 'delete' buttons*/}
                <Header
                    addTask={this.addTask}
                    tasks={this.state.tasks}
                    status={this.state.status}
                    selectedTasks={selectedTasks}
                    removeSelected={this.removeSelected}
                    selectAllTasks={this.selectAllTasks}
                    deselect={this.deselect}

                />
                {/*the following code is for the task editor*/}
                <Modal
                    show={editMode}
                    onHide={() => this.setState({editMode: false})}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton >
                        <Modal.Title>Editor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(event)=> event.preventDefault()}>
                            <Form.Row >
                                <Form.Group as={Col} controlId='taskName'>
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Add new task"
                                                  value={this.state.name}
                                                  onChange={(event) => {this.changeTask(event, 'name')}}

                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId='deadline'>
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control type="datetime-local"
                                                  placeholder="Write task description"
                                                  format='timestamp'
                                                  min={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                                  value={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                                  onChange={(event) => {this.changeTask(event, 'deadline')}}
                                                  disabled={!!selectedTasks.size}
                                    />
                                </Form.Group>

                            </Form.Row>
                            <Form.Row >
                                <Form.Group as={Col} controlId='taskDesc'>
                                    <Form.Control as="textarea"
                                                  placeholder="Write task description"
                                                  value={this.state.desc}
                                                  onChange={(event) => {this.changeTask(event, 'desc')}}
                                                  disabled={!!selectedTasks.size}
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                                onClick={() => {
                                    this.setState({show: false})
                                    const newTask = {...this.state}
                                    delete newTask.show
                                    this.setState({name: '', desc: ''})
                                }
                                }
                                disabled={!!selectedTasks.size}
                        >
                            Add
                        </Button>
                        <Button variant="danger">Cancel</Button>
                    </Modal.Footer>
                </Modal>

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
                                                   onChange={()=> selectTask(task._id)}
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
                                                <Button
                                                    disabled={!!selectedTasks.size}
                                                    variant='primary'
                                                    className={`${classes.removeTask} ${classes.action}`}
                                                    onClick={()=> editTask(task._id)}
                                                > <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    disabled={!!selectedTasks.size}
                                                    variant='success'
                                                    className={`${classes.removeTask} ${classes.action}`}
                                                > <FontAwesomeIcon icon={faCheck} />
                                                </Button>
                                                <Button
                                                    disabled={!!selectedTasks.size}
                                                    variant='danger'
                                                    className={`${classes.removeTask} ${classes.action}`}
                                                    onClick={()=> removeTask(task._id)}
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
            </>
        )
    }

}
export default ToDo