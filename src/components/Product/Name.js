import React, {Component} from 'react'
class Name extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const name = this.props.name;
        return (
            <div>
                <h1>{name}</h1>
            </div>
        )
    }
}
export default Name