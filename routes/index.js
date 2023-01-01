import React from 'react'
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import 'react-native-gesture-handler'
import {
    Platform
} from 'react-native'

import Main from '../screens/main'
import Add from '../screens/add'

import { COLORS } from '../utils/const'

const Stack = createStackNavigator()

export const navigationRef = createNavigationContainerRef()

export const rootNavigate = (name, params) => {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

const Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="CheMainck"
                screenOptions={{
                    ...TransitionPresets.SlideFromRightIOS,
                    gestureDirection: 'horizontal',
                    gestureEnabled: true,
                    cardOverlayEnabled: true,
                    headerBackTitleStyle: {
                        display: 'none',
                        color: COLORS.primary.black
                    },
                    headerStyle: {
                        backgroundColor: 'transparent',
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerLeftContainerStyle: {
                        paddingLeft: Platform.OS === 'ios' ? 7 : 0,
                    },
                    cardStyle: {
                        backgroundColor: COLORS.secondary.white,
                        zIndex: 2
                    },
                    headerTitleStyle: {
                        color: COLORS.secondary.black,
                        fontSize: 28
                    },
                    presentation: 'transparentModal',
                    headerStatusBarHeight: 0
                }}
            >
                <Stack.Screen
                    name='Main'
                    component={Main}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name='Add'
                    component={Add}
                    options={{
                        headerTitle: "Вернуться назад"
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router