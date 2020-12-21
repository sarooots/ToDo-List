import React, {Component} from 'react'
class Name extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const name = this.props.name;
        return name
    }
}
export default Name