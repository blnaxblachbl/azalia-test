import { useEffect } from "react"
import { UIManager, Platform } from "react-native"

import Router from "./routes"
import StateProvider from './store'
import { Toast } from "./components"

const App = () => {

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [])

    return (
        <StateProvider>
            <Router />
            <Toast />
        </StateProvider>
    )
}

export default App