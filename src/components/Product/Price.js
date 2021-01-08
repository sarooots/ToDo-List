import React, {Component} from 'react'
import classes from "./Product.module.sass";
class Price extends Component{
    render() {
        const price = this.props.price;
        const currency = this.props.currency;
        return (
            <td className={classes.price}>{`${price} ${currency}`}</td>
        )
    }

}
export default Price