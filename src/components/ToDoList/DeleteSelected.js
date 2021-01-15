import React, {Component, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'

class DeleteSelected extends Component {
    state = {
        show: false
    }
    render() {
        const {show} = this.state
        const handleClose = () => this.setState({show: false})
        const handleShow = () => this.setState({show: true})
        const {selectedTasks, removeSelected} = this.props
        return (
            <>
                <Button variant="danger"
                        disabled={!selectedTasks.size}
                        onClick={()=> {handleShow()}}
                >
                    delete selected
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Selected</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to delete selected {selectedTasks.size} tasks ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => {
                            handleClose()
                            removeSelected(selectedTasks)}}>
                            Delete all
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}
export default DeleteSelected