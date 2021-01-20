import React, {Component} from 'react'
import {Button, Col, Form, Modal} from 'react-bootstrap'
import PropTypes from "prop-types"
import moment from "moment";
import idGenerator from "../../helpers/idGenerator"
import classes from './NewTask.sass'

class NewTask extends Component {
    static propTypes = {
        addTask: PropTypes.func.isRequired,
        tasks: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
    }
    state = {
        name: '',
        desc: '',
        deadline: new Date().getTime() + 1440 * 60 * 1000,
        editMode: false,
        _id: idGenerator(),
        show: false
    }
    changeTask = (event, property ) => {
        new Date(event.target.value).getTime()
        const  value = property === 'deadline'? new Date(event.target.value).getTime(): event.target.value
        this.setState({[property]: value})
    }
    handleShow = () => this.setState({show: true})
    render() {
        const {show} = this.state
        const {selectedTasks, addTask, className} = this.props

        return (
            <>
                <Button variant="success" onClick={this.handleShow} className={`${className} text-nowrap`} disabled={!!selectedTasks.size}>
                    new task
                </Button>

                <Modal
                    show={show}
                    onHide={() => this.setState({show: false})}
                    backdrop="static"
                    keyboard={false}
                    class='rounded-0'
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton >
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(event)=> event.preventDefault()}>
                            <Form.Row >
                                <Form.Group as={Col} controlId='taskName'>
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Add new task"
                                                  value={this.state.name}
                                                  onChange={(event) => {this.changeTask(event, 'name')}}

                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId='deadline'>
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control type="datetime-local"
                                                  placeholder="Write task description"
                                                  format='timestamp'
                                                  min={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                                  value={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                                  onChange={(event) => {this.changeTask(event, 'deadline')}}
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
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary"
                                onClick={() => {
                                    this.setState({show: false})
                                    const newTask = {...this.state}
                                    delete newTask.show
                                    addTask(newTask)
                                    this.setState({name: '', desc: ''})
                                }
                                }
                                disabled={!!selectedTasks.size}
                        >
                            Add
                        </Button>
                        <Button variant="danger">Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default NewTask