import React, {Component} from 'react'
import {Button} from 'react-bootstrap'

class DeleteSelected extends Component{

    render() {
        const {selectedTasks} = this.props
        console.log(selectedTasks)
            return (
                <Button
                    variant="danger"
                    disabled={!selectedTasks.size}
                    onClick={()=> this.props.removeSelected()}>delete selected</Button>)
    }
}
export default DeleteSelected