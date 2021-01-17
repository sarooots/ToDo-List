import React, {Component} from 'react'
import Task from './Task'
import TopMenu from './TopMenu'
import classes from './ToDoList.module.sass'
import {Container, Col, Row } from 'react-bootstrap'
import idGenerator from "../../helpers/idGenerator"

class ToDo extends Component {
    state = {
        tasks: [],
        status: ['Not started', 'In progress', 'completed'],
        selectedTasks: new Set()
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
        console.log(tasks.length)
        console.log(selectedTasks.size)
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
    completeTask = taskId => {
        const {tasks, status} = this.state
        const completedTask = tasks.filter((task) => task._id === taskId)
        const allTasks = tasks.filter((task) => task._id !== taskId)
        completedTask[0].status = status[2]
        this.setState({tasks: [...allTasks, completedTask]})
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
        return (
            <Container  fluid className={classes.toDoList}>
                <Row  className={`${classes.addTask} justify-content-md-center`}>
                    <Col lg={6}>
                        <TopMenu
                            addTask={this.addTask}
                            tasks={this.state.tasks}
                            status={this.state.status}
                            selectedTasks={selectedTasks}
                            removeSelected={this.removeSelected}
                            selectAllTasks={this.selectAllTasks}
                            deselect={this.deselect}

                        />
                    </Col>
                </Row>
                <Row className={classes.tasks}>
                    <Task
                        tasks={tasks}
                        removeTask={this.removeTask}
                        completeTask={this.completeTask}
                        selectTask={this.selectTask}
                        selectedTasks={selectedTasks}
                    />
                </Row>
            </Container>
        )
    }

}
export default ToDo