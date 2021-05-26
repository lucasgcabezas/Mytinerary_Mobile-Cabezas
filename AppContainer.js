import React from 'react'
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Drawer from './navigation/Drawer'
// import SignUp from './screens/SignUp'
import authActions from './redux/actions/authActions'


const AppContainer = (props) => {

    const checkIfPrevUserLogged = async () => {
        let getToken;
        let getUserLogged;

        try {
            getToken = await AsyncStorage.getItem('token')
            getUserLogged = await AsyncStorage.getItem('userLogged')
        } catch (error) {
            alert(error)
        }

        if (!props.userLogged && getToken) {
            let userData = JSON.parse(getUserLogged)
            const userLS = { ...userData, token: getToken }
            props.signInLocalStorage(userLS)
            return null
        }
    }
    checkIfPrevUserLogged()

    return (
        <NavigationContainer>
            <Drawer />
        </NavigationContainer>
    )
}

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    signInLocalStorage: authActions.signInLocalStorage,
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)



