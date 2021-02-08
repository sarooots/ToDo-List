import React, {Component} from "react"
import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap"
import classes from "../ToDo/ToDo.module.sass"
import {Link} from "react-router-dom"
import {formatDate} from "../../../helpers/utils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import Editor from "../../Editor/Editor";

export default class SingleTask extends Component{

    state = {
        task: null,
        show: false
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
    removeTask = taskId => {

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response)=>{
                const res = await response.json()
                if (response.status >= 400 && response.status <600) {
                    throw res.error ?res.error : new Error("Something went wrong!")
                }
                this.setState({task: null})
                this.props.history.push('/')

            })
            .catch(error => {
                console.log("catch error", error)
            })


    }


    editTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editedTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response)=>{
                const res = await response.json()
                if (response.status >= 400 && response.status <600) {
                    throw res.error ?res.error : new Error("Something went wrong!")
                }
                this.setState({task: editedTask})
            })
            .catch(error => {
                console.log("catch error", error)
            })
    }
    toggleShow = () => this.setState({show: !this.state.show})

    handleEdit = editTask => this.setState({ editTask,  show: !this.state.show})

    render() {
        const {task, show} = this.state

        return (
            <>
            <Container  fluid className={classes.toDoList}>
                        <Row>
                            <Col xs={12}>
                                {task ?
                                <Card className={`${classes.task}`}>
                                    <Card.Body className={classes.cBody}>
                                        <Link to={`/task/${task._id}`}>
                                            <Card.Title className={classes.title}>{task.title}</Card.Title>
                                        </Link>
                                        <Card.Subtitle className={`mb-2 text-muted ${classes.date}`}>{`date: ${formatDate(task.date)}`}</Card.Subtitle>
                                        <Card.Text className={`${classes.desc} ${task.description ===""?classes.emptyDesc:""}`}>
                                            {task.description === "" ? "this task has no description": task.description}
                                        </Card.Text>
                                        <ButtonGroup size="sm" className={classes.actions}>
                                            <Button variant="success"
                                                    onClick={() => {
                                                        this.handleEdit(task)
                                                    }}
                                                    className="rounded-0 text-nowrap">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={()=> this.removeTask(task._id)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </ButtonGroup>
                                    </Card.Body>
                                </Card>
                                    : <p>Task data not exists!</p>
                                }
                            </Col>
                        </Row>
                    </Container>
                {
                    show &&
                    <Editor
                        mode='edit'
                        show={show}
                        action={this.editTask}
                        toggleShow={this.toggleShow}
                        task={task}/>
                }

            </>
        )

    }


}