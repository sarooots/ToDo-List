import React, {Component} from 'react'
import {Button, Col, Container, Row, Navbar} from "react-bootstrap"
import classes from "./ToDoList.module.sass"
import DeleteSelected from "./DeleteSelected"
import PropTypes from "prop-types"
import TaskEditor from "./TaskEditor"

class TopMenu extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
        tasks: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
        removeSelected: PropTypes.func.isRequired,
        selectAllTasks: PropTypes.func.isRequired,
        deselect: PropTypes.func.isRequired,
    }
    render() {
        const {addTask, tasks, selectedTasks, removeSelected, selectAllTasks, deselect} = this.props

        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">To Do Lost</Navbar.Brand>
                <Container>
                    <Row lg={6}>
                     <Col lg='auto'>
                        <label className={classes.select}>
                        <input type="checkbox"
                                    disabled={!tasks.length}
                                    onChange={selectAllTasks}
                                    checked={selectedTasks.size === tasks.length && tasks.length > 0 }
                        />
                            <span className={classes.checkmark}></span>
                        </label>
                     </Col>
                        <Col>
                        <Button
                            variant="primary"
                            onClick={()=> deselect()}
                            disabled={!selectedTasks.size}
                        >
                            deselect
                        </Button>
                    </Col>
                        <Col>
                        <DeleteSelected
                            removeSelected={removeSelected}
                            selectedTasks={selectedTasks}
                        />
                        </Col>
                        <TaskEditor
                            addTask={addTask}
                            selectedTasks={selectedTasks}
                            tasks={tasks}
                        />
                    </Row>
                </Container>
            </Navbar>

        )
    }
}

export default TopMenu