import React, { useState } from "react"
import {
    ScrollView,
    KeyboardAvoidingView,
    StyleSheet
} from 'react-native'

import {
    Input,
    Button,
    toast
} from "../../components"
import { useStateValue } from "../../store"

const Add = () => {
    const { reducer } = useStateValue()
    const [_, dispatch] = reducer
    const [value, setValue] = useState("")

    const addNewTask = () => {
        const text = value.replace(/ /gm, '')
        if (text) {
            dispatch({
                type: "addTask",
                data: {
                    id: new Date().getTime(),
                    done: false,
                    text
                }
            })
            toast.success("Задача добавлена")
            setValue("")
        } else {
            toast.error("Поле не должно быть пустым")
        }
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior='height'>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Input
                    value={value}
                    placeholder={'Текст новой задачи'}
                    style={styles.input}
                    onChangeText={text => setValue(text)}
                    onSubmitEditing={addNewTask}
                />
                <Button
                    text="Добавить"
                    onPress={addNewTask}
                    disable={value.length === 0}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Add

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
    },
    input: {
        marginBottom: 12
    }
})