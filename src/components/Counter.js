import React, {Component} from 'react'

class Counter extends Component{
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            value: 0
        }
    }

    handleClickPlus= ()=> {
    this.setState({value: this.state.value + 1})
    }

    render() {
        let value = 0;
        return(
            <div>gago
                {this.props.defaultValue}
                <h3>{this.state.value}</h3>
                <button
                    onClick={this.handleClickPlus}
                >count +</button>
            </div>
        )
    }
}

export default Counter