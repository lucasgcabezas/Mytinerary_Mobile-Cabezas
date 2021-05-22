import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import React from 'react'
import {HomeStack} from './Stack'

const bottom = createBottomTabNavigator()

const Bottom = (props) => {
    return (
        <bottom.Navigator>
            <bottom.Screen name="home" component={HomeStack} options={{
                title: 'Home!'
            }} />
            {/* <drawer.Screen name="amigos" component={AmigosStack} options={{
                title: 'Lista de Amigos',
            }}/> */}
        </bottom.Navigator>
    )
}

export default Bottom
