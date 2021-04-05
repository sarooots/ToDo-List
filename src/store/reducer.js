import * as act from "./actTypes"
import {checkLoginStatus} from "../helpers/auth"

const defaultState = {
    tasks: [],
    addTaskSuccess: false,
    deleteTaskSuccess: false,
    editTaskSuccess: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    task: null,
    user: null,
    offset: false,
    isAuthenticated: checkLoginStatus()
}
export default  function reducer(state=defaultState, action)  {
    switch (action.type) {
        case act.GET_TASKS:
            return {
                ...state,
                loading: false,
                tasks: action.tasks,
                task: null
            }
        case act.GET_TASK:
            return {
                ...state,
                loading: false,
                task: action.task
            }
        case act.DELETE_TASK:{
            const tasks = state.tasks.filter((task)=> action.taskId !== task._id)
            return {
                ...state,
                tasks,
                deleteTaskSuccess: true,
                loading: false,
                successMessage: "Task deleted successfully!"
            }}
        case act.DELETE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter((task)=>{
                    return !action.selectedTasks.has(task._id)
                }),
                deleteTaskSuccess: true,
                loading: false,
                successMessage: `${action.selectedTasks.size} task${action.selectedTasks.size>1?"s":""} deleted successfully!`
            }
        case act.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                loading: false,
                successMessage: `New task added successfully!`


            }
        case act.PENDING:
            return {
                ...state,
                addTaskSuccess: false,
                deleteTaskSuccess: false,
                editTaskSuccess: false,
                loading: true,
                successMessage: null,
                errorMessage: null,

            }
        case act.EDIT_TASK:{
            let succcessMessage = `Task edited successfully!`
            if (action.statusChanged) {
                succcessMessage = action.editedTask.status === "done"?  `Congrats you have completed the task!`: `Task is active now !`
            }
            const tasks = [...state.tasks]
            const editId = tasks.findIndex((el)=> el._id===action.editedTask._id)
            tasks[editId] = action.editedTask

            const newState = {
                ...state,
                tasks,
                task: action.from==="single"? action.editedTask: null,
                editTaskSuccess: true,
                loading: false,
            }
            newState.successMessage = succcessMessage

            return newState }
        case act.ERROR:{
            return {
                ...state,
                errorMessage:  action.errorMessage,
                loading: false
            }}
        case act.REGISRTER_SECCESS:{
            return {
                ...state,
                successMessage:  "Registered successfully, welcome to our site",
                loading: false
            }}
        case act.LOGIN_SECCESS:{
            return {
                ...state,
                successMessage:  "Welcome back!",
                isAuthenticated: true,
                loading: false
            }}
        case act.LOGOUT_SECCESS:{
            return {
                ...state,
                successMessage:  "Please come back as soon as possible, we are waiting for you!",
                isAuthenticated: false,
                loading: false
            }}
        case act.CONTACT_SECCESS:{
            return {
                ...state,
                successMessage:  "Message sent successfully",
                loading: false
            }}
        case act.GET_USER:{
            return {
                ...state,
                user: action.user,
                loading: false
            }}
        case act.SET_OFFSET:{
            return {
                ...state,
                offset: action.scrollTop,
            }}
        default : return state
    }
}