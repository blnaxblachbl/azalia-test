import React from "react"
import {
    StyleSheet,
    TouchableWithoutFeedback,
    Platform,
    Text,
    Dimensions,
    View,
    LayoutAnimation
} from 'react-native'
import Animated, {
    useAnimatedStyle,
    useAnimatedGestureHandler,
    useSharedValue,
    withSpring,
    withTiming,
    runOnJS
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

import { useStateValue } from "../store"
import { COLORS } from "../utils/const"
import { Icon } from "./Icon"
import { toast } from "./Toast"

const { width } = Dimensions.get("window")
const limit = width / 3

export const Task = ({ item = null }) => {
    const { reducer } = useStateValue()
    const [_, dispatch] = reducer
    const anim = useSharedValue(0)

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: anim.value }],
    }))

    const switchDone = () => {
        dispatch({
            type: "updateTask",
            data: {
                ...item,
                done: !item.done
            }
        })
    }

    const removeTask = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        dispatch({
            type: "removeTask",
            data: item.id
        })
        toast.success("Задача удалена")
    }

    const eventHandler = useAnimatedGestureHandler({
        onActive: (event, context) => {
            anim.value = event.translationX
        },
        onEnd: (event, context) => {
            const position = Math.abs(event.translationX)
            const direction = event.translationX > 0 ? 1 : -1

            if (position > limit) {
                anim.value = withTiming(width * direction, { duration: 100 }, runOnJS(removeTask))
            } else {
                anim.value = withSpring(0)
            }
        },
    })

    if (!item) return null

    return (
        <PanGestureHandler onGestureEvent={eventHandler}>
            <Animated.View
                style={[
                    styles.animatedContainer,
                    animatedStyle
                ]}
            >
                <TouchableWithoutFeedback onPress={switchDone}>
                    <View style={styles.container}>

                        <Icon name={item.done ? "checked" : "unchecked"} size={24} color={COLORS.primary.black} />
                        <Text style={[styles.text, item.done ? styles.textDone : undefined]}>{item.text}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </PanGestureHandler>
    )
}

const styles = StyleSheet.create({
    animatedContainer: {
        width: '100%',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "100%",
        padding: 12,
        borderRadius: 8,
        backgroundColor: COLORS.secondary.white,
        elevation: 2,
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
        color: COLORS.primary.black,
        marginLeft: 12,
        fontSize: 21,
    },
    textDone: {
        color: COLORS.secondary.black,
        textDecorationLine: 'line-through'
    }
})