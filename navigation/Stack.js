import {createStackNavigator} from '@react-navigation/stack'
import React from 'react'

import Home from '../screens/Home'
import Cities from '../screens/Cities'

const stack = createStackNavigator()

export const HomeStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="home" component={Home} options={{headerShown: false}} />
        </stack.Navigator>
    )
}

export const CitiesStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="cities" component={Cities}   options={{headerShown: false}}/>
       
        </stack.Navigator>
    )
}
