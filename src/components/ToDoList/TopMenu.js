import React, {Component} from 'react'
import moment from "moment"
import {Button, Col, Form} from "react-bootstrap"
import classes from "./ToDoList.module.sass"
import idGenerator from "../../helpers/idGenerator"
import DeleteSelected from "./DeleteSelected"
import PropTypes from "prop-types"

class TopMenu extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
        tasks: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
        removeSelected: PropTypes.func.isRequired,
        selectAllTasks: PropTypes.func.isRequired,
        deselect: PropTypes.func.isRequired,
    }

    state = {
        name: '',
        desc: '',
        deadline: new Date().getTime() + 1440 * 60 * 1000,
        editMode: false,
        _id: idGenerator()
    }
    changeTask = (event, property ) => {
         new Date(event.target.value).getTime()
        const  value = property === 'deadline'? new Date(event.target.value).getTime(): event.target.value
        this.setState({[property]: value})
    }
    handleInputKeyPress = event => {
        if (event.key === 'Enter') {
            const newTask = {...this.state}
            this.props.addTask(newTask)
            this.setState({name: '', desc: ''})}
    }

    render() {
        const {addTask, tasks, selectedTasks, removeSelected, selectAllTasks, deselect} = this.props

        return (
            <Form onSubmit={(event)=> event.preventDefault()}>
                <Form.Row >
                    <Form.Group as={Col} controlId='taskName'>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text"
                                      placeholder="Add new task"
                                      value={this.state.name}
                                      className={classes.input}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'name')}}
                                      disabled={!!selectedTasks.size}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId='deadline'>
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type="datetime-local"
                                      placeholder="Write task description"
                                      format='timestamp'
                                      min={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                      value={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
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
                <Form.Row className="align-items-center justify-content-md-center">
                    <Col xs="auto">
                        <label className={classes.select}>
                        <input type="checkbox"
                                    disabled={!tasks.length}
                                    onChange={selectAllTasks}
                                    checked={selectedTasks.size === tasks.length && tasks.length > 0 }

                        />
                            <span className={classes.checkmark}></span>
                        </label>
                    </Col>
                    <Col xs="auto" >
                        <Button
                            variant="primary"
                            onClick={()=> deselect()}
                            disabled={!selectedTasks.size}
                        >
                            deselect
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <DeleteSelected
                            removeSelected={removeSelected}
                            selectedTasks={selectedTasks}
                        />
                    </Col>
                    <Col xs="auto" className={classes.addTask}>
                        <Button
                            variant="success"
                            onClick={()=> {
                                const newTask = {...this.state}
                                addTask(newTask)
                                this.setState({name: '', desc: ''})
                            }
                            }
                            disabled={!!selectedTasks.size}
                        >
                            add task</Button>

                    </Col>
                </Form.Row>
            </Form>
        )
    }
}

export default TopMenu