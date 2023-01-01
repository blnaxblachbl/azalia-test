import React, { forwardRef } from "react"
import {
    TextInput,
    StyleSheet,
    View
} from 'react-native'
import { COLORS } from "../utils/const"

export const Input = forwardRef(({ 
    style,
    placeholderTextColor, 
    ...props 
}, ref) => {
    return (
        <TextInput
            ref={ref}
            style={[styles.container, style]}
            placeholderTextColor={COLORS.primary.black}
            {...props}
        />
    )
})

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: COLORS.secondary.white,
        elevation: 2,
        fontSize: 24,

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
    }
})