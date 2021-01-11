import React, {Component} from 'react'

class DeleteSelected extends Component{
    render() {
        console.log()
        if (this.props.selectedTasks > 1) {
            return (
                <button disabled>delete selected</button>
            )

        } else {
            return <>gag</>
        }
    }
}
export default DeleteSelected