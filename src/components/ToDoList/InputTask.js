import React, {Component} from 'react'
import moment from "moment"
import {Button, Col, Form} from "react-bootstrap"
import classes from "./ToDoList.module.sass"
import idGenerator from "../../helpers/idGenerator";

class InputTask extends Component {
    state = {
            name: '',
            desc: '',
            deadline: moment().add(24, 'h').format('YYYY-MM-DDThh:mm'),
            status: this.props.status[1],
            editMode: false,
            _id: idGenerator()
    }
    changeTask = (event, property ) => {
        this.setState({[property]: event.target.value})
    }
    handleInputKeyPress = event => {
        if (event.key === 'Enter') {
            const {task} = this.state
            this.props.addTask(task)
        }
    }

    render() {
        const {addTask, selectedTasks} = this.props


        return (
            <Form onSubmit={(event)=> event.preventDefault()}>
                <Form.Row >
                    <Form.Group as={Col} controlId='endData'>
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
                                      min={this.state.deadline}
                                      value={this.state.deadline}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'endDate')}}
                                      disabled={!!selectedTasks.size}
                        />
                    </Form.Group>

                </Form.Row>
                <Form.Control as="textarea"
                              placeholder="Write task description"
                              value={this.state.desc}
                              onChange={(event) => {this.changeTask(event, 'desc')}}
                              disabled={!!selectedTasks.size}
                />
                <Button
                    variant="success"
                    onClick={()=> {
                        const newTask = {...this.state}
                        addTask(newTask)}
                    }
                    disabled={!!selectedTasks.size}
                >
                    add task</Button>
            </Form>
        )
    }
}

export default InputTask