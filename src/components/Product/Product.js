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
                        <td>
                            <Name name={name}/>
                        </td>
                        <td>
                            <Desc desc={desc}/>
                        </td>
                        <td>
                            <Price price={price}/>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }

}

const test = new Product();
console.log(test.props)
export default Product