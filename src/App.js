import React from 'react'
import ToDo from './components/Pages/ToDo/ToDo'
import About from './components/Pages/About/About'
import Contact from './components/Pages/Contact/Contact'
import SingleTask from './components/Pages/SingleTask/SingleTask'
import NotFound from './components/Pages/NotFound/NotFound'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Navbar from './components/NavMenu/NavMenu'
import './App.scss'
import Spinner from "./components/Spinner/Spinner";
import {connect} from "react-redux";
function App({loading}) {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route
                        path='/'
                        component = {ToDo}
                        exact
                    />
                    <Route
                        path='/home'
                        component = {ToDo}
                        exact
                    />
                    <Route
                        path='/about'
                        component = {About}
                        exact
                    />
                    <Route
                        path='/contact'
                        component = {Contact}
                        exact
                    />
                    <Route
                        path='/task/:taskId'
                        component = {SingleTask}
                        exact
                    />
                    <Route
                        path='/not-found'
                        component = {NotFound}
                        exact
                    />
                    <Redirect to='not-found'/>
                </Switch>
            </BrowserRouter>
            { loading && <Spinner/> }

        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        loading: state.loading,
    }
}

export default connect(mapStateToProps)(App);
