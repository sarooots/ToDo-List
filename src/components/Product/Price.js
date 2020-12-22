import React, {Component} from 'react'
class Price extends Component{
    constructor(props) {
        super(props)
        this.state = {
            price: props.price
        }
    }
    render() {
        const price = this.state.price;
        return (
            <td>{price}</td>
        )
    }

}
export default Price