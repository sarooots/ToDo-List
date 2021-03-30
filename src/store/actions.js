import requestWithToken from "../helpers/requestWithToken";
import request from "../helpers/auth"
import * as act from "./actTypes"
import {history} from "../helpers/history";
import {saveToken} from "../helpers/auth"

    const apiHost = process.env.REACT_APP_API_HOST
export function getTasks(params) {

    const query = `/?${Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&')}`
    history.push(`/tasks${query}`)

    return (dispatch) =>{
        dispatch({type: act.PENDING})
        requestWithToken(`${apiHost}/task${query}`)
            .then((res)=>{
              if (!res) {return}
                dispatch({type: act.GET_TASKS, tasks: res})
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
}

export function getTask(taskId) {
    return (dispatch) =>{
        dispatch({type: act.PENDING})
        requestWithToken(`${apiHost}/task/${taskId}`,)
            .then((res)=>{
              if (!res) {return}
              dispatch({type: act.GET_TASK, task: res})
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
}

export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({type: act.PENDING})
        requestWithToken(`${apiHost}/task/${taskId}`, "DELETE")
            .then((res)=>{
              if (!res) {return}
              dispatch({type: act.DELETE_TASK, taskId})
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
}

export function deleteTasks(selectedTasks) {
    return (dispatch) =>{
        dispatch({type: act.PENDING})
        requestWithToken(`${apiHost}/task/`,"PATCH", {tasks: Array.from(selectedTasks)})
            .then((res)=>{
              if (!res) {return}
              dispatch({type: act.DELETE_TASKS, selectedTasks})
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
}

export function addTask(task) {
    return (dispatch) => {
        dispatch({type: act.PENDING})
        requestWithToken(`${apiHost}/task`, "POST", task)
            .then((res)=>{
              if (!res) {return}
              dispatch({type: "ADD_TASK", task: res})
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
}

export function editTask(data, from, statusChanged) {
    return (dispatch)=>{
        dispatch({type: act.PENDING})
        requestWithToken(`${apiHost}/task/${data._id}`, "PUT", data)
            .then((editedTask)=>{
              if (!editedTask) {return}
              dispatch({type: act.EDIT_TASK, editedTask, from, statusChanged})
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
 }

export function register(data) {
    return (dispatch)=>{
        dispatch({type: act.PENDING})
        request(`${apiHost}/user`, "POST", data)
          .then(()=>{
            dispatch({type: act.REGISRTER_SECCESS})
              history.push("/signin")
          })
          .catch((error) => {
              dispatch({type: act.ERROR, errorMessage: error.message})
          })
    }
}

export function login(data) {
    return (dispatch)=>{
        dispatch({type: act.PENDING})
        request(`${apiHost}/user/sign-in`, "POST", data)
          .then((result )=>{
            saveToken(result)
              dispatch({type: act.LOGIN_SECCESS})
              history.push("/tasks")
          })
          .catch((error) => {
              dispatch({type: act.ERROR, errorMessage: error.message})
          })
    }
}

export function logout(jwt) {
    return (dispatch)=>{
        dispatch({type: act.PENDING})
        request(`${apiHost}/user/sign-out`, "POST", {jwt})
          .then(()=>{
              localStorage.removeItem("token")
              dispatch({type: act.LOGOUT_SECCESS})
              history.push("/")
          })
          .catch((error) => {
              dispatch({type: act.ERROR, errorMessage: error.message})
          })
    }
}