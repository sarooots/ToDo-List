import React, {Component} from 'react'
class Price extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const price = this.props.price;
        return (
            <div>
                <p>{price}</p>
            </div>
        )
    }

}
export default Price