import React from 'react'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground } from 'react-native'

const Navbar = ({props}) => {
    return (
        <View style={styles.navbarContainer}>
            {/* <Entypo name="menu" size={40} color="white" /> */}
            <Ionicons name="md-menu" size={45} color="white" style={styles.menuButton} onPress={() => props.navigation.openDrawer()}/>
            <ImageBackground source={require('../assets/isologo.png')} style={styles.logoText} />
        </View>

    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: '#2d003d',
        // backgroundColor: 'red',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 45
    },

    menuButton: {
        position: 'absolute',
        left: 10

    },


    logoText: {
        resizeMode: 'cover',
        height: 35,
        width: 185,
    },
})

export default Navbar


