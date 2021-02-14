import React, {Component, createRef} from "react"
import {Button, Col, Form, Modal} from "react-bootstrap"
import PropTypes from "prop-types"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {formatDate} from "../../helpers/utils"
import classes from "./Editor.sass"

class Editor extends Component {
    constructor(props) {
        super(props)
        const {mode} = this.props
        if (mode === "edit") {
            const {task} = props
            this.state = {
                ...task,
                date: task.date ? new Date(task.date) : new Date()
            }

        } else {
            this.state = {
                title: "",
                description: "",
                date: new Date(),
            }
        }
        this.focusedRef = createRef()
    }

    static propTypes = {
        action: PropTypes.func.isRequired,
        task: PropTypes.object,
        mode: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
        toggleShow: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.focusedRef.current.focus()
    }

    changeTaskProperty = (event, property ) => {
        this.setState({[property]: event.target.value})
    }
    changeTaskDate = (value) => {
        this.setState({
            date: value || formatDate(new Date().toISOString())
        })
    }

    acceptButton = () => {
        const newTask = {...this.state}
        newTask.date = formatDate(newTask.date.toISOString())
        const {mode, action, toggleShow} = this.props
        if (newTask.title.trim() !==  "") {
            action(newTask)
            toggleShow()
            if (mode === "new") {
                this.setState({title: "", description: ""})
            }
        }

    }

    render() {

        const {mode, show, toggleShow} = this.props
        return (
            <Modal
                show={show}
                onHide={toggleShow}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title>{mode==="new"? "New task": "Edit task"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(event)=> event.preventDefault()}>
                        <Form.Row >
                            <Form.Group as={Col} controlId="taskTitle">
                                <Form.Label>Task Title</Form.Label>
                                <Form.Control type="text"
                                              ref={this.focusedRef}
                                              placeholder="Add new task"
                                              value={this.state.title}
                                              onChange={(event) => {
                                                  this.changeTaskProperty(event, "title")
                                              }}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="date">
                                <Form.Label>Date</Form.Label>
                                <div>
                                <DatePicker
                                    minDate={new Date()}
                                    selected={this.state.date}
                                    onChange={this.changeTaskDate}
                                    customInput={<Form.Control type="text" className={classes.date}/>}
                                />
                                </div>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="taskDesc">
                                <Form.Control as="textarea"
                                              placeholder="Write task description"
                                              value={this.state.description}
                                              onChange={(event) => {this.changeTaskProperty(event, "description")}}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={mode ==="new"?"primary":"success"}
                            onClick={this.acceptButton}>
                        {mode ==="new"?"add task":"save changes"}
                    </Button>
                    <Button variant="danger"
                            onClick={toggleShow}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default Editor