import React, {Component} from 'react'
class Name extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const name = this.props.name;
        return (
            <td>{name}</td>
        )
    }
}
export default Name