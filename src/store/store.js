import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

console.log(process.env.NODE_ENV)
const params = [thunk]
if (process.env.NODE_ENV==="development"){
    params.push(logger)
}


const middleware =  applyMiddleware(...params)
export const store =  createStore(reducer, middleware)
