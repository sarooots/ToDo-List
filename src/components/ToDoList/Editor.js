import React, {Component} from 'react'
import {Button, Col, Form, Modal} from 'react-bootstrap'
import PropTypes from "prop-types"
import moment from "moment";
// import idGenerator from "../../helpers/idGenerator"
// import classes from './Editor.sass'

class Editor extends Component {
    constructor(props) {
        super(props);
        const {mode} = this.props
        if (mode === 'edit') {
            const {task} = props
            this.state = {...task}
        } else {
            this.state = {
                title: '',
                description: '',
                deadline: new Date().getTime() + 1440 * 60 * 1000,
                // _id: idGenerator(),
            }
        }
    }

    static propTypes = {
        action: PropTypes.func.isRequired,
        task: PropTypes.object,
        mode: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
        toggleShow: PropTypes.func.isRequired,
    }

    changeTaskProperty = (event, property ) => {
        new Date(event.target.value).getTime()
        const  value = property === 'deadline'? new Date(event.target.value).getTime(): event.target.value
        this.setState({[property]: value})
    }

    acceptButton = () => {
        const newTask = {...this.state}
        const {mode, action, toggleShow} = this.props
        if (newTask.title.trim() !==  '') {
            action(newTask)
            toggleShow()
            if (mode === 'new') {
                this.setState({title: '', description: ''})
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
                    <Modal.Title>{mode==='new'? 'New task': 'Edit task'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(event)=> event.preventDefault()}>
                        <Form.Row >
                            <Form.Group as={Col} controlId='taskTitle'>
                                <Form.Label>Task Title</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Add new task"
                                              value={this.state.title}
                                              onChange={(event) => {
                                                  this.changeTaskProperty(event, 'title')
                                              }}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId='deadline'>
                                <Form.Label>Deadline</Form.Label>
                                <Form.Control type="datetime-local"
                                              placeholder="Write task description"
                                              format='timestamp'
                                              min={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                              value={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                              onChange={(event) => {this.changeTaskProperty(event, 'deadline')}}/>
                            </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId='taskDesc'>
                                <Form.Control as="textarea"
                                              placeholder="Write task description"
                                              value={this.state.description}
                                              onChange={(event) => {this.changeTaskProperty(event, 'description')}}/>
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant={mode ==='new'?"primary":'success'}
                            onClick={this.acceptButton}>
                        {mode ==='new'?"add task":'save changes'}
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