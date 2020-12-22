import React, {Component} from 'react'
class Desc extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const desc = this.props.desc;
        return (
            <td>{desc}</td>
        )
    }

}
export default Desc