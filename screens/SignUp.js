import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions } from 'react-native'
// import { connect } from 'react-redux'
// import authActions from '../redux/actions/authActions'



const SignUp = (props) => {

    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', userPic: '', country: '' })
    const [errors, setErrors] = useState({})

    
    const getInput = (e, field) => { setNewUser({ ...newUser, [field]: e }) }

    const sendNewUser = async (e = null, user) => {

        console.log(user)

        // if (!Object.values(user).some(value => value === '')) {
        //     const catchErrors = await props.signUpUser(user)
        //     if (catchErrors) {
        //         setErrors({})
        //         catchErrors.details.map(err => setErrors(prevState => {
        //             return { ...prevState, [err.context.label]: err.message }
        //         }))
        //     } else if (e) {
        //         setNewUser({ firstName: '', lastName: '', email: '', password: '', userPic: '', country: '' })
        //     }
        // } else {
        //     alert('Please complete all the fields to continue!')
        // }

    }

    return (
        <>
            <StatusBar backgroundColor='#2d003d' />
            <View style={styles.signUpContainer}>
                <TextInput placeholder="First Name" placeholderTextColor="#2d003d99" style={styles.signUpInput} onChangeText={(e) => getInput(e, 'firstName')} />
                {/* <Text>{errors.firstName}</Text> */}

                <TextInput placeholder="Last Name" placeholderTextColor='#2d003d99' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'lastName')} />

                <TextInput placeholder="Email" placeholderTextColor='#2d003d99' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'email')} />

                <TextInput placeholder="Password" placeholderTextColor='#2d003d99'  style={styles.signUpInput} onChangeText={(e) => getInput(e, 'password')} />

                <TextInput placeholder="Url picture" placeholderTextColor='#2d003d99'  style={styles.signUpInput} onChangeText={(e) => getInput(e, 'userPic')} />

                <TextInput placeholder="Country" placeholderTextColor='#2d003d99'  style={styles.signUpInput} onChangeText={(e) => getInput(e, 'country')} />
                
                <Text style={styles.signUpSend} onPress={(e) => sendNewUser(e, newUser)} >Register</Text>
            </View>
        </>
    )
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    signUpContainer: {
        backgroundColor: 'red',
        minHeight: ScreenHeight,
        alignItems: 'center'
    },

    signUpInput: {
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        width: '80%'
    },

    signUpSend:{
        backgroundColor: 'red'
    }
})


export default SignUp

// const mapDispatchToProps = {
//     signUpUser: authActions.signUpUser
// }

// export default connect(null, mapDispatchToProps)(SignUp)