import React, {Component} from 'react'
import Task from './Task'
import InputTask from './InputTask'
import classes from './ToDoList.module.sass'
import {Container, Col, Row } from 'react-bootstrap'

class ToDo extends Component {
    state = {
        tasks: [],
        status: ['Not started', 'In progress', 'completed']
    }
 removeTask = taskIndex => {
     const {tasks} = this.state

     tasks.splice(taskIndex, 1)
    this.setState({tasks: tasks})
}
 completeTask = taskIndex => {
     const {tasks, status} = this.state
     const newList = tasks
    newList[taskIndex].status = status[3]
    this.setState({tasks: tasks})
}
 addTask = task => {
     const {tasks} = this.state

     console.log(task)
    if (task.name.trim() !==  '' & '' !== task.desc.trim() ) {
        const newTask = task
        this.setState({tasks: [...tasks, newTask]})
    }
}


render() {
    const {tasks, status} = this.state
    return (
            <Container fluid className={classes.ToDoList}>
                <Row className={classes.addTask}>
                    <Col>
                        <InputTask
                            addTask={this.addTask}
                        />
                    </Col>
                </Row>
                <br/>
                <Row className={classes.tasks}>
                    <Task
                        tasks={tasks}
                        removeTask={this.removeTask}
                        completeTask={this.completeTask}
                    />
                </Row>
            </Container>
        )
    }

}
export default ToDo