import React, {Component} from "react"
import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap"
import classes from "../ToDo/ToDo.module.sass"
import {Link} from "react-router-dom"
import {formatDate} from "../../../helpers/utils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import Editor from "../../Editor/Editor";
import request from "../../../helpers/request";

export default class SingleTask extends Component{

    state = {
        task: null,
        show: false
    }
    componentDidMount() {
        request(`http://localhost:3001/task/${this.props.match.params.taskId}`,)
        .then( (res)=>{
            this.setState({task: res})
        })
    }

    removeTask = taskId => {
        request(`http://localhost:3001/task/${taskId}`,"DELETE")
            .then( ()=>{
                this.setState({task: null})
                this.props.history.push('/')
            })
    }

    editTask = (editedTask) => {
        request(`http://localhost:3001/task/${editedTask._id}`,"PUT", editedTask)
            .then(()=>{
                this.setState({task: editedTask})
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