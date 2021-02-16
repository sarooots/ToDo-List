import React from "react";
import {connect} from "react-redux";
function ShowCounter (props) {
    return (
        <h1>
            {props.value}
        </h1>
    )

}
const mapStateToProps = state => {
    return {
        value: state.count
    }
}
export default connect(mapStateToProps)(ShowCounter)