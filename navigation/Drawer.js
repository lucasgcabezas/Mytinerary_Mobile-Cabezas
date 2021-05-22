import {createDrawerNavigator} from '@react-navigation/drawer'
import React from 'react'
import {HomeStack, CitiesStack} from './Stack'

const drawer = createDrawerNavigator()

const Drawer = (props) => {
    return (
        <drawer.Navigator drawerType={'slide'} >
            <drawer.Screen name="home" component={HomeStack}  options={{
                headerShown: false,
                title: 'Home'
            }} />
            <drawer.Screen name="cities" component={CitiesStack} options={{
                title: 'Cities',
            }}/>
        </drawer.Navigator>
    )
}

export default Drawer
