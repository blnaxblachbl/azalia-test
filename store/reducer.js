export const functions = (state, action) => {
    switch (action.type) {
        case 'setTasks': {
            return action.data
        }
        case 'addTask': {
            return [action.data, ...state]
        }
        case 'removeTask': {
            return state.filter(item => item.id !== action.data)
        }
        case 'updateTask': {
            return state.map(item => {
                if (item.id === action.data.id){
                    return action.data
                }
                return item
            })
        }
        default:
            return state
    }
}