import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, StatusBar, Image, ImageBackground, TouchableOpacity } from 'react-native'

const Home = (props) => {

    return (
        <>
            <StatusBar backgroundColor='#2d003d' />
            <View style={styles.homeConteiner}>
                <View style={styles.logosContainer}>
                    <Image source={require('../assets/logoImg.png')} style={styles.logoImg}></Image>
                    <ImageBackground source={require('../assets/isologo.png')} style={styles.logoText} />
                </View>
                {
                    props.userLogged
                        ? <TouchableOpacity style={styles.buttonHome} onPress={() => props.navigation.navigate('cities')}>
                            <Text style={{ color: 'white', fontSize: 30, }}>Lets go!</Text>
                        </TouchableOpacity >
                        : <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.buttonHome} onPress={() => props.navigation.navigate('signin')}>
                                <Text style={{ color: 'white', fontSize: 30, }}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonHome} onPress={() => props.navigation.navigate('signup')}>
                                <Text style={{ color: 'white', fontSize: 30, }}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                }
            </View>
        </>

    )
}

const styles = StyleSheet.create({
    homeConteiner: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logosContainer: {
        height: '50%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logoImg: {
        backgroundColor: 'yellow',
        resizeMode: 'cover',
        height: 230,
        width: 230
    },
    logoText: {
        resizeMode: 'cover',
        height: 60,
        width: 350
    },
    buttonsContainer: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '23%'

    },
    buttonHome: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2d003d',
        width: '60%',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 70,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

export default connect(mapStateToProps)(Home)



