import React, {Component} from 'react'
import Price from './Price'
import Name from './Name'
import Desc from './Desc'
import classes from './Product.module.css'

class Product extends Component{
    constructor(props) {
        super(props)
        this.state = {
            price: props.price
        }

    }
    render() {
        const {name, desc} = this.props;
        const {price} = this.state;
        const changeCurrency = (gag) => {
            if (gag === this.props.price) {
                this.setState({price: '$3'})
            } else {
                this.setState({price: this.props.price})
            }
        }

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
                <button
                    onClick={() => changeCurrency(this.state.price)}
                >change currency</button>
            </div>
        )
    }
}
export default Product