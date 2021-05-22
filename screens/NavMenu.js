import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Ionicons, MaterialCommunityIcons, AntDesign, FontAwesome } from '@expo/vector-icons';

const NavMenu = () => {
    return (
        <View style={styles.navMenuContainer}>
            {/* <Text>Hola</Text> */}
            {/* <Ionicons name="md-checkmark-circle" size={32} color="black" /> */}
            <View style={styles.navIconsDiv}>
                <Ionicons name="md-home-outline" size={30} color="#ffffff55" />
                <Text style={styles.navMenuText}>Home</Text>
            </View>
            <View style={styles.navIconsDiv}>
                <MaterialCommunityIcons name="city-variant-outline" size={30} color="#ffffff55" />
                <Text style={styles.navMenuText}>Cities</Text>
            </View>
            <View style={styles.navIconsDiv}>
                <AntDesign name="adduser" size={30} color="#ffffff55" />
                <Text style={styles.navMenuText}>Sign Up</Text>
            </View>
            <View style={styles.navIconsDiv}>
                <FontAwesome name="sign-in" size={30} color="#ffffff55" />
                <Text style={styles.navMenuText}>Sign In</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navMenuContainer: {
        backgroundColor: '#2d003d',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    navIconsDiv: {
        alignItems: 'center'
    },

    navMenuText: {
        color: '#ffffff55',
        fontSize: 10
    }




})

export default NavMenu
