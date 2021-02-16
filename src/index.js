import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Counter from '../src/demo/Counter';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

const reducer = (state={count:0, increment: 1}, action) => {
    let newState = {}
    switch (action.type) {
        case "CHANGE_COUNT":
            newState = {
            ...state,
            count: state.count + state.increment
        }
            break;
        case "CHANGE_INCREMENT": if (action.increment>0) { newState = {
            ...state,
            increment: action.increment
        }}
            break;
        default : newState = state
    }
    return newState
}

const store = createStore(reducer)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<App />*/}
            <Counter/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
