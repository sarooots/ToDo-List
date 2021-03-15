import request from "../helpers/request";
import * as act from "./actTypes"
import {history} from "../helpers/history";

    const apiHost = process.env.REACT_APP_API_HOST
export function getTasks(params) {

    const query = `?${Object.entries(params).map(([key, value])=>`${key}=${value}`).join('&')}`
    history.push(`/${query}`)

    return (dispatch) =>{
        dispatch({type: act.PENDING})
        request(`${apiHost}/task${query}`)
            .then((res)=>{
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
        request(`${apiHost}/task/${taskId}`,)
            .then((res)=>{
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
        request(`${apiHost}/task/${taskId}`, "DELETE")
            .then(()=>{
                dispatch({type: act.DELETE_TASK, taskId})
                history.push("/")
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
}

export function deleteTasks(selectedTasks) {
    return (dispatch) =>{
        dispatch({type: act.PENDING})
        request(`${apiHost}/task/`,"PATCH", {tasks: Array.from(selectedTasks)})
            .then(()=>{
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
        request(`${apiHost}/task`, "POST", task)
            .then((res)=>{
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
        request(`${apiHost}/task/${data._id}`, "PUT", data)
            .then((editedTask)=>{
                dispatch({type: act.EDIT_TASK, editedTask, from, statusChanged })
            })
            .catch((error) => {
                dispatch({type: act.ERROR, errorMessage: error.message})
            })
    }
 }

export function register(data) {
    return (dispatch)=>{
        dispatch({type: act.PENDING})
        request(`${apiHost}/user}`, "POST", data)
          .then((result )=>{
              console.log(result)
              // dispatch({type: act.EDIT_TASK, editedTask, from, statusChanged })
          })
          .catch((error) => {
              dispatch({type: act.ERROR, errorMessage: error.message})
          })
    }
}