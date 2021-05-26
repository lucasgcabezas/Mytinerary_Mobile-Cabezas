import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import Home from '../screens/Home'
import Cities from '../screens/Cities'
import SignUp from '../screens/SignUp'
import SignIn from '../screens/SignIn'
import Itinearies from '../screens/Itinearies'
import Itinerary from '../screens/Itinerary'

const stack = createStackNavigator()

export const HomeStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="home" component={Home} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}

export const CitiesStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="cities" component={Cities} options={{ headerShown: false }} />
            <stack.Screen name="itineraries" component={Itinearies} options={{ headerShown: false }} />
            <stack.Screen name="itinerary" component={Itinerary} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}

export const SignInStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="signin" component={SignIn} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}

export const SignUpStack = () => {
    return (
        <stack.Navigator>
            <stack.Screen name="signup" component={SignUp} options={{ headerShown: false }} />
        </stack.Navigator>
    )
}
