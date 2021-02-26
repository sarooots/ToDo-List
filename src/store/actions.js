import request from "../helpers/request";
import * as act from "./actTypes"

export function getTasks() {
    return (dispatch) =>{
        dispatch({type: act.PENDING})
        request("http://localhost:3001/task")
            .then((res)=>{
                dispatch({type: act.GET_TASKS, tasks: res})
            })
    }
}

export function deleteTask(taskId) {
    return (dispatch) => {
        dispatch({type: act.PENDING})
        request(`http://localhost:3001/task/${taskId}`, "DELETE")
            .then(()=>{
                dispatch({type: act.DELETE_TASK, taskId})
            })
    }
}

export function deleteTasks(selectedTasks) {
    return (dispatch) =>{
        dispatch({type: act.PENDING})
        request(`http://localhost:3001/task/`,"PATCH", {tasks: Array.from(selectedTasks)})
            .then(()=>{
                dispatch({type: act.DELETE_TASKS, selectedTasks})
            })
    }
}

export function addTask(task) {
    return (dispatch) => {
        dispatch({type: act.PENDING})
        request("http://localhost:3001/task", "POST", task)
            .then((res)=>{
                dispatch({type: "ADD_TASK", task: res})
            })
    }
}

export function editTask(data) {
    return (dispatch)=>{
        dispatch({type: act.PENDING})
        request(`http://localhost:3001/task/${data._id}`, "PUT", data)
            .then((editedTask)=>{
                dispatch({type: act.EDIT_TASK, editedTask })
            })
    }
}