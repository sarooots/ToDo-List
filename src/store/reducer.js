const defaultState = {
    tasks: []
}
export default  function reducer(state=defaultState, action)  {
    switch (action.type) {
        case "GET_TASKS":
            return {
                ...state,
                tasks: action.tasks
            }
        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task)=> action.taskId !== task._id)
            }
        case "REMOVE_SELECTED":
            return {
                ...state,
                tasks: state.tasks.filter((task)=>{
                    return !action.selectedTasks.has(task._id)
                })
            }
        case "ADD_TASK":
            return {
                ...state,
                tasks: [...state.tasks, action.task]
            }
        case "EDIT_TASK":{
            const newList = state.tasks
            const editId = state.tasks.findIndex((el)=> el._id===action.editedTask._id)
            newList[editId] = action.editedTask
            return {
                ...state,
                tasks: [...newList]
            }}
        default : return state
    }
}