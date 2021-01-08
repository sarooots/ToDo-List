import React, {Component} from 'react'
import moment from "moment"
import {Button, Col, Form} from "react-bootstrap"
import classes from "./ToDoList.module.sass"

class InputTask extends Component {
    state = {
        task: {
            name: '',
            desc: '',
            startDate: moment().format('YYYY-MM-DDThh:mm'),
            endDate: moment().add(24, 'h').format('YYYY-MM-DDThh:mm'),
            createdDate: moment().format('YYYY-MM-DDThh:mm'),
            status: 'in progress',
            assigned: [],
            steps: [],
            editMode: false
        }
    }
    changeTask = (event, property ) => {
        const {task} = this.state
        const tempTask = task
        tempTask[property] = event.target.value
        this.setState({task: tempTask})
        console.log(task)
    }
    handleInputKeyPress = event => {
        if (event.key === 'Enter') {
            const {task} = this.state
            this.props.addTask(task)
        }
    }

    render() {
        const {task} = this.state
        const {addTask} = this.props


        return (
            <Form onSubmit={(event)=> event.preventDefault()}>
                <br/>
                <Form.Control type="text"
                              placeholder="Add new task"
                              value={task.name}
                              className={classes.input}
                              onKeyPress={(event) => this.handleInputKeyPress(event)}
                              onChange={(event) => {this.changeTask(event, 'name')}}
                />
                <br/>
                <Form.Control as="textarea"
                              placeholder="Write task description"
                              value={task.desc}
                              onChange={(event) => {this.changeTask(event, 'desc')}}
                />
                <br/>
                <Form.Row >
                    <Form.Group as={Col} controlId='startData'>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="datetime-local"
                                      placeholder="Write task description"
                                      min={moment().format('YYYY-MM-DDThh:mm').toString()}
                                      value={task.startDate}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'startDate')}}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId='endData'>
                        <Form.Label>End date</Form.Label>
                        <Form.Control type="datetime-local"
                                      placeholder="Write task description"
                                      min={task.startDate}
                                      value={task.endDate}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'endDate')}}
                        />
                    </Form.Group>
                </Form.Row>
                <Button
                    variant="success"
                    onClick={()=> {addTask(task)}
                    }
                >
                    add task</Button>
            </Form>
        )
    }
}

export default InputTask