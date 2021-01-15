import React, {Component} from 'react'
import classes from './ToDoList.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Button, Card, Col, ButtonGroup} from 'react-bootstrap'


class Tasks extends Component {
    render() {
        const {tasks, removeTask, completeTask, selectTask, selectedTasks} = this.props

        return(
            <>
                {tasks.map((task,index)=>{
                    return (
                        <Col key={task._id}
                             lg={3}
                             md={4}
                             sm={6}
                             xs={12}
                        >
                            <Card className={`${classes.task} ${selectedTasks.has(task._id)? classes.selected: ''}`}>
                                <label  className={classes.select}>
                                    <input type="checkbox"
                                           className={classes.select}
                                           onChange={()=> selectTask(task._id)}
                                           checked={selectedTasks.has(task._id)}
                                    />
                                    <span className={classes.checkmark}></span>
                                    <div className={classes.fillWidth}></div>

                                </label>
                                <Card.Body className={classes.cBody}>
                                    <Card.Title>{task.name}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{`Deadline: ${task.deadline.format("MMM Do YY")}`}</Card.Subtitle>
                                    <Card.Text>{task.desc}</Card.Text>
                                    <ButtonGroup size="sm" className={classes.actions}>
                                        <Button
                                            disabled={!!selectedTasks.size}
                                            variant='primary'
                                            className={`${classes.removeTask} ${classes.action}`}
                                            onClick={()=> removeTask(index)}
                                        > <FontAwesomeIcon icon={faEdit} />
                                        </Button>
                                        <Button
                                            disabled={!!selectedTasks.size}
                                            variant='success'
                                            className={`${classes.removeTask} ${classes.action}`}
                                            onClick={()=> completeTask(task._id)}
                                        > <FontAwesomeIcon icon={faCheck} />
                                        </Button>
                                        <Button
                                            disabled={!!selectedTasks.size}
                                            variant='danger'
                                            className={`${classes.removeTask} ${classes.action}`}
                                            onClick={()=> removeTask(task._id)}
                                        > <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </ButtonGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                })}
            </>
        )
    }
}

export default Tasks