import React, {Component} from 'react'
import moment from "moment"
import {Button, Col, Form} from "react-bootstrap"
import classes from "./ToDoList.module.sass"
import idGenerator from "../../helpers/idGenerator"
import DeleteSelected from "./DeleteSelected"
import PropTypes from "prop-types"
import TaskEditor from "./TaskEditor"

class TopMenu extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
        tasks: PropTypes.array.isRequired,
        status: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
        removeSelected: PropTypes.func.isRequired,
        selectAllTasks: PropTypes.func.isRequired,
        deselect: PropTypes.func.isRequired,
    }


    render() {
        const {addTask, tasks, selectedTasks, removeSelected, selectAllTasks, deselect} = this.props

        return (
            <Form onSubmit={(event)=> event.preventDefault()}>
                <Form.Row className="align-items-center justify-content-md-center">
                    <Col xs="auto">
                        <label className={classes.select}>
                        <input type="checkbox"
                                    disabled={!tasks.length}
                                    onChange={selectAllTasks}
                                    checked={selectedTasks.size === tasks.length && tasks.length > 0 }

                        />
                            <span className={classes.checkmark}></span>
                            <span >selected {`${selectedTasks.size} task${selectedTasks.size>1?'s': ''}`} </span>
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
                    <Col xs="auto">
                        <TaskEditor
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