import React, {Component} from 'react'
import moment from "moment"
import {Button, Col, Form} from "react-bootstrap"
import classes from "./ToDoList.module.sass"
import idGenerator from "../../helpers/idGenerator";
import DeleteSelected from "./DeleteSelected"

class InputTask extends Component {
    state = {
        name: '',
        desc: '',
        deadline: moment().add(24, 'h'),
        deadlin:  Date.now(),
        status: this.props.status[1],
        editMode: false,
        _id: idGenerator()
    }
    changeTask = (event, property ) => {
        this.setState({[property]: event.target.value})
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
                    <Form.Group as={Col} controlId='endData'>
                        <Form.Label>Deadline</Form.Label>
                        <Form.Control type="datetime-local"
                                      placeholder="Write task description"
                                      min={this.state.deadline.format('YYYY-MM-DDThh:mm')}
                                      value={this.state.deadline.format('YYYY-MM-DDThh:mm')}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'endDate')}}
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
                                    checked={selectedTasks.size === tasks.length && tasks.length > 1 }

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

export default InputTask