import React, {Component} from 'react'
import Price from './Price'
import Name from './Name'
import Desc from './Desc'
import classes from './Product.module.css'

class Product extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        const name = this.props.name;
        const desc = this.props.desc;
        const price = this.props.price;
        return (
            <div>
                <table>
                    <tr>
                        <th>Product name</th>
                        <th>Description</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <Name name={name}/>
                        <Desc desc={desc}/>
                        <Price price={price}/>
                    </tr>
                </table>
            </div>
        )
    }

}

const test = new Product();
console.log(test.props)
export default Product