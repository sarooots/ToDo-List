import React, {Component} from 'react'
class Price extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const price = this.props.price;
        return (
            <td>{price}</td>
        )
    }

}
export default Price