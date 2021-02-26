import * as act from "./actTypes"
const defaultState = {
    tasks: [],
    addTaskSuccess: false,
    deleteTaskSuccess: false,
    editTaskSuccess: false,
    loading: false,
    task: {}
}
export default  function reducer(state=defaultState, action)  {
    switch (action.type) {
        case act.GET_TASKS:
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            }
        case act.DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter((task)=> action.taskId !== task._id),
                deleteTaskSuccess: true,
                loading: false


            }
        case act.DELETE_TASKS:
            return {
                ...state,
                tasks: state.tasks.filter((task)=>{
                    return !action.selectedTasks.has(task._id)
                }),
                deleteTaskSuccess: true,
                loading: false
            }
        case act.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
                addTaskSuccess: true,
                loading: false

            }
        case act.PENDING:
            return {
                ...state,
                addTaskSuccess: false,
                deleteTaskSuccess: false,
                editTaskSuccess: false,
                loading: true
            }
        case act.EDIT_TASK:{
            const tasks = [...state.tasks]
            const editId = tasks.findIndex((el)=> el._id===action.editedTask._id)
            tasks[editId] = action.editedTask
            return {
                ...state,
                tasks,
                editTaskSuccess: true,
                loading: false

            }}
        default : return state
    }
}