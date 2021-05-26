import React, { useEffect, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { connect } from 'react-redux'
import authActions from '../redux/actions/authActions'



const SignUp = (props) => {

    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', password: '', userPic: '', country: '' })
    const [errors, setErrors] = useState({ firstName: '', lastName: '', email: '', password: '', userPic: '' })
    const [passwordNotShow, setPasswordNotShow] = useState(true)
    const [selectedValue, setSelectedValue] = useState('')

    const contriesArrayDropdown = ['Argentina', 'Brazil', 'Italy', 'Spain', 'Germany', 'France', 'United States', 'Chile', 'Mexico', 'United Kingdom'].sort()

    useEffect(() => { setNewUser({ ...newUser, country: selectedValue }) }, [selectedValue])




    const getInput = (e, field) => { setNewUser({ ...newUser, [field]: e }) }

    const sendNewUser = async (e = null, user) => {

        if (!Object.values(user).some(value => value === '')) {
            const catchErrors = await props.signUpUser(user)
            if (catchErrors) {
                setErrors({ firstName: '', lastName: '', email: '', password: '', userPic: '' })
                catchErrors.details.map(err => setErrors(prevState => {
                    return { ...prevState, [err.context.label]: err.message }
                }))
            } else if (e) {
                setNewUser({ firstName: '', lastName: '', email: '', password: '', userPic: '', country: '' })
                props.navigation.navigate('cities')
            }
        } else {
            alert('Please complete all the fields to continue!')
        }
    }

    return (
        <ImageBackground source={require('../assets/signup.jpg')} style={styles.signUpImg}>
            <StatusBar backgroundColor='#2d003d' />
            {/* <StatusBar backgroundColor='#2d003d' /> */}
            <View style={styles.signUpContainer}>
                <Text style={styles.signUpTitle}>Welcome</Text>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="person" size={25} color="#ffffff" />
                        <TextInput placeholder="First Name" placeholderTextColor="#ffffff" style={styles.signUpInput} onChangeText={(e) => getInput(e, 'firstName')} />
                    </View>
                    <Text style={styles.errorField}>{errors.firstName}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="person" size={25} color="#ffffff" />
                        <TextInput placeholder="Last Name" placeholderTextColor='#ffffff' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'lastName')} />
                    </View>
                    <Text style={styles.errorField}>{errors.lastName}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="email" size={25} color="#ffffff" />
                        <TextInput placeholder="Email" placeholderTextColor='#ffffff' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'email')} />
                    </View>
                    <Text style={styles.errorField}>{errors.email}</Text>
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
                    <Text style={styles.errorField}>{errors.password}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="camera-alt" size={25} color="#ffffff" />
                        <TextInput placeholder="Url picture" placeholderTextColor='#ffffff' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'userPic')} />
                    </View>
                    <Text style={styles.errorField}>{errors.userPic}</Text>
                </View>

                <View style={styles.signUpFieldContainer}>
                    <View style={styles.signUpInputContainer}>
                        <MaterialIcons name="location-on" size={25} color="#ffffff" />
                        {/* <TextInput placeholder="Country" placeholderTextColor='#ffffff' style={styles.signUpInput} onChangeText={(e) => getInput(e, 'country')} /> */}
                        <Picker
                            selectedValue={selectedValue}
                            onValueChange={itemValue => setSelectedValue(itemValue)}
                            dropdownIconColor='ffffff'
                            style={styles.signUpDropdown}
                        >
                            <Picker.Item label="Select your country" value='' />
                            {
                                contriesArrayDropdown.map((country, i) => <Picker.Item key={i} label={country} value={country} />)
                            }
                        </Picker>
                    </View>
                </View>

                <Text style={styles.signUpSend} onPress={(e) => sendNewUser(e, newUser)} >Register</Text>
                <Text>
                    <Text style={{ color: 'white', fontSize: 20 }}>Alredy have an account?</Text> <Text 
                    style={{ color: 'white', fontSize: 20, textDecorationLine: 'underline' }} onPress={() => props.navigation.navigate('signin')}>Sign In!</Text>
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
        marginBottom: 15
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
        marginTop: 20,
        marginBottom: 20
    }
})


// export default SignUp

const mapDispatchToProps = {
    signUpUser: authActions.signUpUser
}

export default connect(null, mapDispatchToProps)(SignUp)