import React from 'react'
import { connect } from 'react-redux'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { HomeStack, CitiesStack, SignInStack, SignUpStack } from './Stack'
import DrawerCustom from '../components/DrawerCustom'

const drawer = createDrawerNavigator()

const Drawer = (props) => {
    return (
        <drawer.Navigator
            drawerType={'front'}
            overlayColor='#2d003dbb'
            drawerContent={props => <DrawerCustom {...props} />}
        >
            <drawer.Screen name="home" component={HomeStack} options={{
                title: 'Home',
                drawerIcon: () => <Ionicons name="ios-home-sharp" size={24} color="#2d003dcc" />
            }} />

            {
                props.userLogged
                && <drawer.Screen name="cities" component={CitiesStack} options={{
                    title: 'Cities',
                    drawerIcon: () => <MaterialCommunityIcons name="city-variant" size={24} color="#2d003dcc" />

                }} />
            }

            {
                !props.userLogged
                && <drawer.Screen name="signin" component={SignInStack} options={{
                    title: 'Sign In',
                    drawerIcon: () => <FontAwesome name="sign-in" size={24} color="#2d003dcc" />
                }} />
            }
            {
                !props.userLogged
                && <drawer.Screen name="signup" component={SignUpStack} options={{
                    title: 'Sign Up',
                    drawerIcon: () => <Ionicons name="person-add" size={24} color="#2d003dcc" />
                }} />
            }
       
        </drawer.Navigator>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

export default connect(mapStateToProps)(Drawer)

