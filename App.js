import { useEffect } from "react"
import { UIManager, Platform } from "react-native"

import Router from "./routes"
import StateProvider from './store'
import { Toast, SafeAreaView } from "./components"

const App = () => {

    useEffect(() => {
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true)
        }
    }, [])

    return (
        <SafeAreaView>
            <StateProvider>
                <Router />
                <Toast />
            </StateProvider>
        </SafeAreaView>
    )
}

export default App