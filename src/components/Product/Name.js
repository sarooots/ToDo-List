import React, {Component} from 'react'
import classes from "./Product.module.sass";
class Name extends Component{
    render() {
        const name = this.props.name;
        return (
            <td className={classes.name}>{name}</td>
        )
    }
}
export default Name