import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import {
    Dimensions,
    Platform,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import { SafeAreaView as Safe } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { COLORS } from "../utils/const"

const { width } = Dimensions.get("window")

const Area = forwardRef((
    {
        style,
        children
    },
    ref
) => {

    const [backgroundColor, setBackground] = useState(COLORS.primary.white)
    const [edges, setEdges] = useState(['top', 'bottom'])

    useImperativeHandle(ref, () => ({
        setBarStyle: (style) => {
            StatusBar.setBarStyle(style)
        },
        setBackground: (color) => {
            if (Platform.OS === "android") {
                StatusBar.setBackgroundColor(color)
            } else {
                setBackground(color)
            }
        },
        setHidden: (hidden) => {
            StatusBar.setHidden(hidden)
            if (hidden) {
                setEdges(['bottom'])
            } else {
                setEdges(['top', 'bottom'])
            }
        }
    }), [StatusBar, setBackground, setEdges])

    return (
        <SafeAreaProvider>
            <Safe style={[styles.container, style, { backgroundColor }]} edges={edges} >
                <View style={styles.bottom} />
                <StatusBar
                    barStyle={"dark-content"}
                    translucent={Platform.OS === "ios"}
                    backgroundColor={'#fff'}
                />
                {children}
            </Safe>
        </SafeAreaProvider>
    )
})

export let statusBar

export const SafeAreaView = ({
    style,
    children
}) => {

    const ref = useRef()

    useEffect(() => {
        if (ref && ref.current) {
            statusBar = ref.current
        }
    }, [ref])

    return (
        <Area
            ref={ref}
            style={style}
        >
            {children}
        </Area>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        backgroundColor: 'transparent'
    },
    bottom: {
        position: 'absolute',
        bottom: 0,
        width,
        backgroundColor: '#fff',
        height: 200
    }
})