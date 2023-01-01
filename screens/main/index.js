import React, { useEffect } from "react"
import {
    View,
    ScrollView,
    Image,
    StyleSheet,
    Text
} from 'react-native'
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import SplashScreen from "react-native-splash-screen"

import { Task, Button, Icon } from '../../components'
import { COLORS } from "../../utils/const"
import { useStateValue } from "../../store"

const logo = require('../../assets/azalia.png')

const Main = ({ navigation }) => {
    const { reducer } = useStateValue()
    const [tasks, _] = reducer

    useEffect(() => {
        setTimeout(SplashScreen.hide, 2000)
    }, [])

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <Image
                    source={logo}
                    style={styles.logo}
                />
                {
                    tasks.length === 0 && (
                        <Text style={styles.emptyText}>Нет заполнированных задач</Text>
                    )
                }
                {
                    tasks.map(item => (
                        <View key={item.id} style={styles.taskContainer}>
                            <Task item={item} />
                        </View>
                    ))
                }
            </ScrollView>
            <View style={styles.addButton}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Add")}>
                    <Icon name="plus-circle" size={56} color={COLORS.primary.black} />
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        padding: 12,
        paddingBottom: 50
    },
    logo: {
        marginTop: "30%",
        marginBottom: 12
    },
    addButton: {
        position: 'absolute',
        bottom: 24,
        right: 12
    },
    taskContainer: {
        width: '100%',
        marginBottom: 12
    },
    emptyText: {
        width: '100%',
        textAlign: 'center',
        color: COLORS.secondary.black,
        marginTop: '50%',
        fontSize: 24
    }
})