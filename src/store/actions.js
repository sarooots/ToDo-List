import request from "../helpers/request";

export function getTasks() {
    return (dispatch) =>{
        request("http://localhost:3001/task")
            .then((res)=>{
                dispatch({type: "GET_TASKS", tasks: res})
            })
    }
}

export function removeTask(taskId) {
    return (dispatch) => {
        request(`http://localhost:3001/task/${taskId}`, "DELETE")
            .then(()=>{
                dispatch({type: "REMOVE_TASK", taskId})
            })
    }
}

export function removeSelected(selectedTasks) {
    return (dispatch) =>{
        request(`http://localhost:3001/task/`,"PATCH", {tasks: Array.from(selectedTasks)})
            .then( ()=>{
                dispatch({type: "REMOVE_SELECTED", selectedTasks})
            })
    }
}

export function addTask(task) {
    return (dispatch) => {
        dispatch({type: "SAVING_TASK"})
        request("http://localhost:3001/task", "POST", task)
            .then((res)=>{
                dispatch({type: "ADD_TASK", task: res})
            })
    }
}

export function editTask(editedTask) {
    return (dispatch)=>{
        dispatch({type: "SAVING_TASK"})
        request(`http://localhost:3001/task/${editedTask._id}`, "PUT", editedTask)
            .then((res)=>{
                dispatch({type: "EDIT_TASK", editedTask: res })
            })
    }
}