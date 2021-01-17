import React, {useState} from 'react'
import {Button, Col, Form, Modal} from 'react-bootstrap'
import PropTypes from "prop-types"
import classes from "./ToDoList.module.sass";
import moment from "moment";
import idGenerator from "../../helpers/idGenerator";

function TaskEditor() {
    state = {
        name: '',
        desc: '',
        deadline: new Date().getTime() + 1440 * 60 * 1000,
        status: this.props.status[1],
        editMode: false,
        _id: idGenerator()
    }
    const changeTask = (event, property ) => {
        new Date(event.target.value).getTime()
        const  value = property === 'deadline'? new Date(event.target.value).getTime(): event.target.value
        this.setState({[property]: value})
    }
    const handleInputKeyPress = event => {
        if (event.key === 'Enter') {
            const newTask = {...this.state}
            this.props.addTask(newTask)
            this.setState({name: '', desc: ''})}
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch static backdrop modal
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Row >
                        <Form.Group as={Col} controlId='taskName'>
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Add new task"
                                          value={this.state.name}
                                          className={classes.input}
                                          onKeyPress={(event) => handleInputKeyPress(event)}
                                          onChange={(event) => {changeTask(event, 'name')}}
                                          disabled={!!selectedTasks.size}
                            />
                        </Form.Group>
                        <Form.Group as={Col} controlId='deadline'>
                            <Form.Label>Deadline</Form.Label>
                            <Form.Control type="datetime-local"
                                          placeholder="Write task description"
                                          format='timestamp'
                                          min={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                          value={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                          onKeyPress={(event) => handleInputKeyPress(event)}
                                          onChange={(event) => {changeTask(event, 'deadline')}}
                                          disabled={!!selectedTasks.size}
                            />
                        </Form.Group>

                    </Form.Row>
                    <Form.Row >
                        <Form.Group as={Col} controlId='taskDesc'>
                            <Form.Control as="textarea"
                                          placeholder="Write task description"
                                          value={this.state.desc}
                                          onChange={(event) => {this.changeTask(event, 'desc')}}
                                          disabled={!!selectedTasks.size}
                            />
                        </Form.Group>
                    </Form.Row>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

TaskEditor.propTypes = {
    addTask: PropTypes.func.isRequired,
    tasks: PropTypes.array.isRequired,
    status: PropTypes.array.isRequired,
    selectedTasks: PropTypes.object.isRequired,
    removeSelected: PropTypes.func.isRequired,
    selectAllTasks: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired,
}

export default TaskEditor