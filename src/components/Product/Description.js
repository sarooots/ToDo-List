import React, {Component} from 'react'
class Name extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const desc = this.props.desc;
        return (
            <div>
                <p>{desc}</p>
            </div>
        )
    }

}
export default Name