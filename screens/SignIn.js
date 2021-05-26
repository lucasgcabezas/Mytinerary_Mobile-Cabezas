import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'



const SignIn = (props) => {

    const [newUser, setNewUser] = useState({ email: '', password: '' })
    const [passwordNotShow, setPasswordNotShow] = useState(true)
    const [selectedValue, setSelectedValue] = useState('')

    useEffect(() => { setNewUser({ ...newUser, country: selectedValue }) }, [selectedValue])
    // useEffect(() => { 
    //     if (props.userLogged) {
    //         props.navigation.navigate('cities')
    //     } 
    // }, [props.userLogged])

    const getInput = (e, field) => { setNewUser({ ...newUser, [field]: e }) }




    const sendSignInUser = (e = null, user) => {
        if (user.email && user.password) {
            props.signInUSer(user)
            e && setNewUser({ email: '', password: '' })
        } else {
            alert('Please complete all the fields to continue!')
        }
    }

    return (
        <ImageBackground source={require('../assets/signin.jpg')} style={styles.signUpImg}>
            <StatusBar backgroundColor='#2d003d' />
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpTitle}>Hello, Friend!</Text>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="email" size={25} color="#ffffff" />
                        <TextInput placeholder="Email" placeholderTextColor='#ffffff' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'email')} />
                    </View>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="vpn-key" size={25} color="#ffffff" />
                        <TextInput placeholder="Password" placeholderTextColor='#ffffff' secureTextEntry={passwordNotShow} style={styles.signUpInput} onChangeText={(e) => getInput(e, 'password')} />
                        {
                            passwordNotShow
                                ? <MaterialCommunityIcons name="eye" size={20} color="#ffffff" onPress={() => setPasswordNotShow(false)} />
                                : <MaterialCommunityIcons name="eye-off" size={20} color="#ffffff" onPress={() => setPasswordNotShow(true)} />
                        }
                    </View>
                </View>

                <Text style={styles.signUpSend} onPress={(e) => sendSignInUser(e, newUser)} >Sign In</Text>
                <Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>Don't have an account yet?</Text> <Text 
                    style={{ color: 'white', fontSize: 20, textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate('signup')} >Sign Up!</Text>
                </Text>

            </View>
        </ImageBackground>
    )
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    signUpImg: {
        width: '100%',
        minHeight: ScreenHeight,
    },
    signUpContainer: {
        width: '100%',
        backgroundColor: '#2d003dcc',
        minHeight: ScreenHeight,
        alignItems: 'center',
        paddingTop: 10
    },
    signUpTitle: {
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 70
    },
    signUpFieldContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    signUpInputContainer: {
        flexDirection: 'row',
        color: '#ffffff',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        width: '90%',
        // marginVertical: 10,
        borderRadius: 10,
        borderColor: '#ffffff',
        borderWidth: 1,
    },
    signUpInput: {
        color: '#ffffff',
        flex: 1,
        marginLeft: 15,
        fontSize: 16
    },
    signUpDropdown: {
        color: '#ffffff',
        flex: 1,
        marginLeft: 7,
        fontSize: 16,
        height: '100%'
    },
    errorField: {
        color: '#dd0000',
        marginTop: 2,
        // backgroundColor:'blue',
        width: '85%',
        fontSize: 12
    },
    signUpSend: {
        backgroundColor: '#2d003d',
        backgroundColor: '#ffffff',
        paddingHorizontal: 40,
        paddingVertical: 12,
        textAlign: 'center',
        fontSize: 20,
        borderRadius: 25,
        color: '#ffffff',
        color: '#2d003d',
        marginTop: 60,
        marginBottom: 35
    }
})


const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}


const mapDispatchToProps = {
    signInUSer: authActions.signInUSer

}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)