import * as act from "./actTypes"
const defaultState = {
    tasks: [],
    saveTaskSuccess: false,
    task: {}
}
export default  function reducer(state=defaultState, action)  {
    switch (action.type) {
        case act.GET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }
        case act.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task)=> action.taskId !== task._id)
            }
        case act.DELETE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter((task)=>{
                    return !action.selectedTasks.has(task._id)
                })
            }
        case act.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                saveTaskSuccess: false
            }
        case act.PENDING:
            return {
                ...state,
                saveTaskSuccess: true
            }
        case act.EDIT_TASK:{
            const newList = state.tasks
            const editId = state.tasks.findIndex((el)=> el._id===action.editedTask._id)
            newList[editId] = action.editedTask
            return {
                ...state,
                tasks: [...newList],
                saveTaskSuccess: false
            }}
        default : return state
    }
}