import React, { createContext, useContext, useReducer } from 'react'

import { tasks } from './states'
import { functions } from './reducer'

const StateContext = createContext()

const StateProvider = (props) => {
    const reducer = useReducer(functions, tasks)

    const value = {
        reducer
    }

    return <StateContext.Provider value={value}>{props.children}</StateContext.Provider>
}

export default StateProvider

export const useStateValue = () => useContext(StateContext)