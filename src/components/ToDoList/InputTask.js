import React, {Component} from 'react'
import moment from "moment"
import {Button, Col, Form} from "react-bootstrap"
import classes from "./ToDoList.module.sass"
import idGenerator from "../../helpers/idGenerator";

class InputTask extends Component {
    state = {
            name: '',
            desc: '',
            startDate: moment().format('YYYY-MM-DDThh:mm'),
            endDate: moment().add(24, 'h').format('YYYY-MM-DDThh:mm'),
            createdDate: moment().format('YYYY-MM-DDThh:mm'),
            status: this.props.status[1],
            assigned: [],
            steps: [],
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
        const {addTask} = this.props


        return (
            <Form onSubmit={(event)=> event.preventDefault()}>
                <br/>
                <Form.Control type="text"
                              placeholder="Add new task"
                              value={this.state.name}
                              className={classes.input}
                              onKeyPress={(event) => this.handleInputKeyPress(event)}
                              onChange={(event) => {this.changeTask(event, 'name')}}
                />
                <br/>
                <Form.Control as="textarea"
                              placeholder="Write task description"
                              value={this.state.desc}
                              onChange={(event) => {this.changeTask(event, 'desc')}}
                />
                <br/>
                <Form.Row >
                    <Form.Group as={Col} controlId='startData'>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="datetime-local"
                                      placeholder="Write task description"
                                      min={moment().format('YYYY-MM-DDThh:mm').toString()}
                                      value={this.state.startDate}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'startDate')}}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId='endData'>
                        <Form.Label>End date</Form.Label>
                        <Form.Control type="datetime-local"
                                      placeholder="Write task description"
                                      min={this.state.startDate}
                                      value={this.state.endDate}
                                      onKeyPress={(event) => this.handleInputKeyPress(event)}
                                      onChange={(event) => {this.changeTask(event, 'endDate')}}
                        />
                    </Form.Group>
                </Form.Row>
                <Button
                    variant="success"
                    onClick={()=> {
                        const newTask = {...this.state}
                        addTask(newTask)}
                    }
                >
                    add task</Button>
            </Form>
        )
    }
}

export default InputTask