import {createStore, applyMiddleware} from "redux";
import reducer from "./reducer";
import logger from "redux-logger";

const middleware = applyMiddleware(logger)
export const store = createStore(reducer, middleware)
