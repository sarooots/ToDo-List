import React, {useState} from "react";
import {connect} from "react-redux";

function ChangeCounter (props) {
    const [increment, setIncrement] = useState(1)
    return (
        <div>
            <button
                onClick={props.onChange}
            >
                change count
            </button>
            <br/>
            <input type="number"
                   value={increment}
                   onChange={e => {
                       setIncrement(!(e.target.value.trim()==="")? e.target.value: 1)
                   }}
            />
            <button
                onClick={
                    props.changeIncrement(parseInt(increment))
                }
            >change increment</button>
        </div>
    )

}

const mapDispatchToProps = (dispatch) => {
    return {
        onChange: () => {
            dispatch({type: "CHANGE_COUNT"})
        },
        changeIncrement: (increment) => {
            dispatch({type: "CHANGE_INCREMENT", increment: increment})
        },
    }
}

export default connect(null, mapDispatchToProps)(ChangeCounter)