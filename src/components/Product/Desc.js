import React, {Component} from 'react'
import classes from "./Product.module.sass";
class Desc extends Component{
    render() {
        const desc = this.props.desc;
        return (
            <td className={classes.desc}>{desc}</td>
        )
    }

}
export default Desc