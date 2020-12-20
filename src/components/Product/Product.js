import React, {Component} from 'react'
import Price from './Price'
import Name from './Name'
import Description from './Description'

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
                {name}
                <Name name={name}/>
                <Description desc={desc}/>
                <Price price={price}/>
            </div>
        )
    }

}

const test = new Product();
console.log(test.props)
export default Product