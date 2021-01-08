import React, {Component} from 'react'
import Price from './Price'
import Name from './Name'
import Desc from './Desc'
 import classes from './Product.module.sass'

class Product extends Component{
    constructor(props) {
        super(props)
        this.state = {
            price: props.price,
            currency: props.currency
        }

    }
    render() {
        const {name, desc} = this.props;
        const {price, currency} = this.state;
        const changeCurrency = () => {
            if (currency === 'AMD') {
                console.log(price)
                this.setState({price: price/500, currency: 'USD'})
            }
            else {
                this.setState({price: price*500, currency: 'AMD'})
            }
        }
        return (
            <>

                    <tr>
                        <Name name={name}/>
                        <Desc desc={desc}/>
                        <Price price={price} currency={currency} className={classes.price}/>
                        <td className={classes.action}><button
                            onClick={() => {changeCurrency()}}
                        >change currency</button>
                        </td>
                    </tr>
            </>
        )
    }
}
export default Product