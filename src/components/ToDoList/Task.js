import React, {Component} from 'react'
import classes from './ToDoList.module.sass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCheck, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {Button, Card, Col} from 'react-bootstrap'


class Tasks extends Component {
    render() {
        const {tasks, removeTask, completeTask, selectTask, selectedTasks} = this.props

        return(
            <>
                {tasks.map((task,index)=>{
                    return (
                        <Col lg={3} key={task._id}>
                            <Card className={'fgdfdgd'}>
                                <input type="checkbox" onChange={()=> selectTask(task._id)}/>
                                <h1>{task.name}</h1>
                                <div>{task.desc}</div>
                                <div className={classes.actions}>
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
                                </div>
                            </Card>
                        </Col>
                    )
                })}
            </>
        )
    }
}

export default Tasks