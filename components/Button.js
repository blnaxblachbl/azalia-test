import React from "react"
import {
    TouchableWithoutFeedback,
    StyleSheet,
    View,
    Text
} from 'react-native'

import { COLORS } from "../utils/const"

export const Button = ({
    children = null,
    text = '',
    style,
    textStyle,
    disable,
    onPress = () => { }
}) => {

    const press = () => {
        if (!disable) {
            onPress()
        }
    }

    return (
        <TouchableWithoutFeedback onPress={press}>
            <View style={[styles.container, style, disable ? styles.disable : undefined]}>
                {
                    children && children
                }
                {
                    text && <Text style={[styles.text, textStyle]}>{text}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLORS.primary.black,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    text: {
        color: COLORS.primary.white,
        marginLeft: 12,
        fontSize: 24,
    },
    disable: {
        backgroundColor: COLORS.secondary.black
    }
})