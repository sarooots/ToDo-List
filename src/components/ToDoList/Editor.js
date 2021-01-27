import React, {Component} from 'react'
import {Button, Col, Form, Modal} from 'react-bootstrap'
import PropTypes from "prop-types"
import moment from "moment";
import idGenerator from "../../helpers/idGenerator"
// import classes from './Editor.sass'

class Editor extends Component {
    static propTypes = {
        addTask: PropTypes.func,
        tasks: PropTypes.array.isRequired,
        selectedTasks: PropTypes.object.isRequired,
        editTask: PropTypes.func,
        id: PropTypes.string
    }
    state = {
        name: '',
        desc: '',
        deadline: new Date().getTime() + 1440 * 60 * 1000,
        _id: idGenerator(),
        show: false
    }

    changeTaskProperty = (event, property ) => {
        new Date(event.target.value).getTime()
        const  value = property === 'deadline'? new Date(event.target.value).getTime(): event.target.value
        this.setState({[property]: value})
    }
    handleShow = () => {
        this.setState({show: true})
        const {mode} = this.props
        if (mode === 'edit') {
            const {tasks, id} = this.props
            const editId = tasks.findIndex((el)=> el._id===id)
            const tempTask = tasks[editId]
            this.setState({
                name: tempTask.name,
                desc: tempTask.desc,
                deadline: tempTask.deadline,
                _id: tempTask._id
            })

        }
    }

    acceptButton = () => {
        this.setState({show: false})
        const newTask = {...this.state}
        delete newTask.show
        const {addTask, mode, editTask} = this.props
        if (mode === 'new') {
            addTask(newTask)
            this.setState({name: '', desc: ''})
        }
        if (mode === 'edit') {
            const {tasks, id} = this.props
            const tempList = tasks
            const editId = tempList.findIndex((el)=> el._id===id)
            const editedTask = {...this.state}
            delete editedTask.show
            tempList[editId] = editedTask
            editTask(tempList)
        }
    }

    render() {
        const {show} = this.state
        const {selectedTasks, className, mode, buttonName, variant} = this.props

        return (
            <>
                <Button variant={variant} onClick={this.handleShow} className={`${className} text-nowrap`} disabled={!!selectedTasks.size}>
                    {buttonName}
                </Button>

                <Modal
                    show={show}
                    onHide={() => this.setState({show: false})}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton >
                        <Modal.Title>{mode==='edit'? 'Edit task': 'New task'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(event)=> event.preventDefault()}>
                            <Form.Row >
                                <Form.Group as={Col} controlId='taskName'>
                                    <Form.Label>Task Name</Form.Label>
                                    <Form.Control type="text"
                                                  placeholder="Add new task"
                                                  value={this.state.name}
                                                  onChange={(event) => {this.changeTaskProperty(event, 'name')}}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId='deadline'>
                                    <Form.Label>Deadline</Form.Label>
                                    <Form.Control type="datetime-local"
                                                  placeholder="Write task description"
                                                  format='timestamp'
                                                  min={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                                  value={moment(this.state.deadline).format('YYYY-MM-DDThh:mm')}
                                                  onChange={(event) => {this.changeTaskProperty(event, 'deadline')}}
                                                  disabled={!!selectedTasks.size}
                                    />
                                </Form.Group>

                            </Form.Row>
                            <Form.Row >
                                <Form.Group as={Col} controlId='taskDesc'>
                                    <Form.Control as="textarea"
                                                  placeholder="Write task description"
                                                  value={this.state.desc}
                                                  onChange={(event) => {this.changeTaskProperty(event, 'desc')}}
                                                  disabled={!!selectedTasks.size}
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant={mode ==='edit'?"success":'primary'}
                                onClick={this.acceptButton}
                                disabled={!!selectedTasks.size}
                        >
                            {mode ==='edit'?"save changes":'add task'}
                        </Button>
                        <Button variant="danger"
                                onClick={() => {
                                    this.setState({show: false})

                                }}
                        >Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Editor