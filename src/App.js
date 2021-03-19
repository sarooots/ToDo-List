import React, {useEffect} from 'react'
import Task from './components/Pages/Tasks/Tasks'
import About from './components/Pages/About/About'
import Contact from './components/Pages/Contact/Contact'
import LogInOut from './components/Pages/LogInOut/LogInOut'
import SingleTask from './components/Pages/SingleTask/SingleTask'
import NotFound from './components/Pages/NotFound/NotFound'
import {Router, Route, Switch, Redirect} from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.scss'
import Spinner from "./components/Spinner/Spinner"
import {connect} from "react-redux"
import { ToastContainer, toast, Flip} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {history} from "./helpers/history"

function App({loading, successMessage, errorMessage}) {
    useEffect(()=>{
        successMessage && toast.success(successMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: null,
        });
        errorMessage && toast.error(errorMessage, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: null,
        });
    }, [successMessage, errorMessage])

    return (
        <div className="App">

            <Router history={history}>
                <Header/>
                <Switch>
                    <Route
                        path='/'
                        component = {Task}
                        exact
                    />
                    <Route
                        path='/home'
                        component = {Task}
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
                        path='/signup'
                        component = {LogInOut}
                        exact
                    />
                    <Route
                        path='/signin'
                        component = {LogInOut}
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
                <Footer/>
            </Router>
            { loading && <Spinner/> }
            <ToastContainer
                position="bottom-right"
                autoClose={7000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Flip}
            />


        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        successMessage: state.successMessage,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(App);
