import React, {Component} from "react"
import {Button, ButtonGroup, Card, Col, Container, Row} from "react-bootstrap"
import classes from "../ToDo/ToDo.module.sass"
import {Link} from "react-router-dom"
import {formatDate} from "../../../helpers/utils"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons"
import Editor from "../../Editor/Editor";
import {connect} from "react-redux";
import {getTask, deleteTask} from "../../../store/actions";

class SingleTask extends Component{

    state = {
        show: false
    }
    componentDidMount() {
        this.props.getTask(this.props.match.params.taskId)

    }

    toggleShow = () => this.setState({show: !this.state.show})

    handleEdit = () => this.setState({show: !this.state.show})

    render() {
        const {show} = this.state
        const {task} = this.props

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
                                                        this.handleEdit()
                                                    }}
                                                    className="rounded-0 text-nowrap">
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={()=> {
                                                    this.props.deleteTask(task._id)
                                                    this.props.history.push('/')
                                                }}>
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
                        from="single"
                        toggleShow={this.toggleShow}
                        task={task}/>
                }
            </>
        )
    }
}

const mapStateToProps =  (state)=> {
    return {task: state.task}
}

const mapDispatchToProps = {
    getTask,
    deleteTask
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)