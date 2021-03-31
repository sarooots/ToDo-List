import React, {useEffect} from 'react'
import Tasks from "./components/Pages/Tasks/Tasks"
import Welcome from './components/Pages/Welcome/Welcome'
import About from './components/Pages/About/About'
import Contact from './components/Pages/Contact/Contact'
import Register from './components/Pages/LoginRegister/Register'
import Login from './components/Pages/LoginRegister/Login'
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
import AuthRoute from "./components/AuthRoute"

function App({loading, successMessage, errorMessage}) {
    // checks if there is notification message then shows it
    // we have two types of notification, success and error, each type has different style
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
                        component = {Welcome}
                        exact
                      />
                      <Route
                        path='/welcome'
                        component = {Welcome}
                        exact
                      />
                      <AuthRoute
                        path='/tasks'
                        component = {Tasks}
                        type="private"
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
                      <AuthRoute
                        path='/signup'
                        component = {Register}
                        type="public"
                        exact
                      />
                      <AuthRoute
                        path='/signin'
                        component = {Login}
                        type="public"
                        exact
                      />
                      <AuthRoute
                        path='/task/:taskId'
                        component = {SingleTask}
                        type="private"
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
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Flip}
              />
          </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.loading,
        successMessage: state.successMessage,
        errorMessage: state.errorMessage
    }
}

export default connect(mapStateToProps)(App);
