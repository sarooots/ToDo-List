import React, {Component} from 'react'
import Task from './Task'
import InputTask from './InputTask'
import classes from './ToDoList.module.sass'
import {Container, Col, Row } from 'react-bootstrap'
import idGenerator from "../../helpers/idGenerator"
import DeleteSelected from "./DeleteSelected"

class ToDo extends Component {
    state = {
        tasks: [],
        status: ['Not started', 'In progress', 'completed'],
        selectedTasks: []
    }
    selectTask = taskId => {
        const {selectedTasks} = this.state
        if (!selectedTasks.includes(taskId)) {
            this.setState({selectedTasks: [...selectedTasks, taskId]})
        } else {
            this.setState({selectedTasks: selectedTasks.filter((selectedId) => selectedId !== taskId)})
        }
    }
    removeTask = taskId => {
        const {tasks} = this.state
        this.setState({tasks: tasks.filter((task)=> taskId !== task._id)})
    }
    completeTask = taskId => {
        const {tasks, status} = this.state
        const allTasks = tasks.filter((task) => task._id === taskId)
        const completedTask = tasks.filter((task) => task._id !== taskId)
        console.log(completedTask)
        this.setState({tasks: tasks})
    }
    addTask = task => {
        const {tasks} = this.state
        task._id = idGenerator()
        console.log(task)
        if (task.name.trim() !==  '' & '' !== task.desc.trim() ) {
            const newTask = task
            this.setState({tasks: [...tasks, newTask]})
        }
    }


    render() {
        const {tasks, selectedTasks} = this.state
        console.log(selectedTasks)
        return (
            <Container fluid className={classes.ToDoList}>
                <Row className={classes.addTask}>
                    <Col>
                        <InputTask
                            addTask={this.addTask}
                            status={this.state.status}
                        />
                    </Col>
                </Row>
                <br/>
                <Row className={classes.tasks}>
                    <DeleteSelected
                        selectedTasks={selectedTasks}
                    />
                </Row>
                <br/>
                <Row className={classes.tasks}>
                    <Task
                        tasks={tasks}
                        removeTask={this.removeTask}
                        completeTask={this.completeTask}
                        selectTask={this.selectTask}
                    />
                </Row>
            </Container>
        )
    }

}
export default ToDo