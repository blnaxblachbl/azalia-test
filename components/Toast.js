import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    Platform,
    Text
} from 'react-native'

import { COLORS } from '../utils/const'

const { width } = Dimensions.get('window')

const ToastMain = ({ style }, ref) => {
    const [text, setText] = useState('Toast')
    const [left, setLeft] = useState(0)
    const [top, setTop] = useState(-100)
    const [color, setColor] = useState('#fff')

    useEffect(() => {
        if (top === 15 || top === 45) {
            setTimeout(hide, 2000)
        }
    }, [top])

    useImperativeHandle(ref, () => ({
        success: (text) => {
            setColor(COLORS.primary.black)
            setText(text)
            setTimeout(show, 200)
        },
        error: (text) => {
            setColor(COLORS.primary.red)
            setText(text)
            setTimeout(show, 200)
        },
    }))

    const show = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        if (Platform.OS === 'ios') {
            setTop(45)
        } else {
            setTop(15)
        }
    }

    const hide = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setTop(-100)
    }

    return (
        <View style={[styles.container, style, { left, top }]}>
            <View style={[styles.toast, { backgroundColor: color }]}>
                <Text style={styles.text}>
                    {text}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        position: 'absolute',
        paddingHorizontal: 15,
        zIndex: 999
    },
    toast: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        ...Platform.select({
            android: {
                elevation: 5
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22
            }
        })
    },
    text: {
        flex: 1,
        fontSize: 16,
        color: COLORS.primary.white,
        marginLeft: 10,
        fontWeight: 'bold'
    }
})

const ToastComponent = forwardRef(ToastMain)

export let toast = {}

export const Toast = (props) => {
    const ref = useRef()

    useEffect(() => {
        if (ref && ref.current) {
            toast = ref.current
        }
    }, [ref])

    return <ToastComponent ref={ref} />
}
