import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "./store";
import { Link } from "react-router-dom";

function ToDo({ text, onButtonClick, id }){
    return (
    <li>
        <Link to={`/${id}`}>
            <span>{text}</span>
            <button onClick={onButtonClick}>DEL</button>
        </Link>
    </li>);
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onButtonClick: () => dispatch(actionCreators.deleteToDo(ownProps.id))
    }
}

export default connect(null, mapDispatchToProps)(ToDo);