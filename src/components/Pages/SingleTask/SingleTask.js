import React, {Component} from "react"
import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap"
import classes from "../ToDo/ToDo.module.sass"
import Actions from "../ToDo/Actions"
import {Link} from "react-router-dom"
import {formatDate, stringTrimmer} from "../../../helpers/utils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"

export default class SingleTask extends Component{

    state = {
        task: null
    }
    componentDidMount() {
        fetch(`http://localhost:3001/task/${this.props.match.params.taskId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async (response)=>{
            const res = await response.json()
            if (response.status >= 400 && response.status <600) {
                throw res.error ?res.error : new Error("Something went wrong!")
            }

            this.setState({task: res})
        })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (

            <Container  fluid className={classes.toDoList}>
                <Actions
                    tasks={this.state.tasks}
                    selectedTasks={selectedTasks}
                    removeSelected={this.removeSelected}
                    selectAllTasks={this.selectAllTasks}
                    deselect={this.deselect}
                    toggleShow={this.toggleShow}
                    changeMode={this.changeMode}/>

                <Row>
                    {
                        tasks.map((task)=>{
                            return (
                                <Col key={task._id}
                                     lg={3}
                                     md={4}
                                     sm={6}
                                     xs={12}>
                                    <Card className={`${classes.task} ${selectedTasks.has(task._id)? classes.selected: ""}`}>
                                        <label  className={classes.select}>
                                            <input type="checkbox"
                                                   className={`${classes.select} rounded-0`}
                                                   onChange={()=> this.selectTask(task._id)}
                                                   checked={selectedTasks.has(task._id)}/>
                                            <span className={classes.checkmark}/>
                                            <div className={classes.fillWidth}/>

                                        </label>
                                        <Card.Body className={classes.cBody}>
                                            <Link to={`/task/${task._id}`}>
                                                <Card.Title className={classes.title}>{task.title}</Card.Title>
                                            </Link>
                                            <Card.Subtitle className={`mb-2 text-muted ${classes.date}`}>{`date: ${formatDate(task.date)}`}</Card.Subtitle>
                                            <Card.Text className={`${classes.desc} ${task.description ===""?classes.emptyDesc:""}`}>
                                                {task.description === "" ? "this task has no description": stringTrimmer(task.description, 10)}
                                            </Card.Text>
                                            <ButtonGroup size="sm" className={classes.actions}>
                                                <Button variant="success"
                                                        onClick={() => {
                                                            this.handleEdit(task)
                                                            this.changeMode("edit")
                                                        }}
                                                        className="rounded-0 text-nowrap"
                                                        disabled={!!selectedTasks.size}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                                <Button
                                                    disabled={!!selectedTasks.size}
                                                    variant="danger"
                                                    onClick={()=> this.removeTask(task._id)}>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Button>
                                            </ButtonGroup>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>

        )

    }


}