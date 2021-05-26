import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { ImageBackground, ScrollView, Text, View, Dimensions, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator, Image } from "react-native"
import { Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import authActions from '../redux/actions/authActions';




const DrawerCustom = (props) => {


    return (
        <>
            {props.userLogged
                && <View style={styles.drawerUserContainer}>
                    <View style={styles.userPicDrawerContainer} >
                        <Image source={{ uri: props.userLogged.userPic }} style={styles.userPicDrawer} />
                    </View>
                    <Text style={styles.userNameDrawer}>Hi {props.userLogged.firstName}! </Text>
                </View>
            }
            <DrawerItem
                label='Home'
                icon={() => <Ionicons name="ios-home-sharp" size={24} color="#2d003dcc" />}
                onPress={() => props.navigation.navigate('home')}

            />
            {
                props.userLogged
                && <DrawerItem
                    label='Cities'
                    icon={() => <MaterialCommunityIcons name="city-variant" size={24} color="#2d003dcc" />}
                    onPress={() => props.navigation.navigate('cities')}
                />
            }

            {
                !props.userLogged
                && <DrawerItem
                    label='Sign In'
                    icon={() => <FontAwesome name="sign-in" size={24} color="#2d003dcc" />}
                    onPress={() => props.navigation.navigate('signin')}
                />
            }

            {
                !props.userLogged
                && <DrawerItem
                    label='Sign Up'
                    icon={() => <Ionicons name="person-add" size={24} color="#2d003dcc" />}
                    onPress={() => props.navigation.navigate('signup')}
                />
            }
            {
                props.userLogged
                && <DrawerItem
                    label='Sign Out'
                    icon={() => <FontAwesome name="sign-out" size={24} color="#2d003dcc" />}
                    onPress={props.signOut}
                />
            }

        </>
    )
}

const styles = StyleSheet.create({
    drawerUserContainer: {
        width: '100%',
        // height: 80,
        // backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: "#2d003d99",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginBottom: 10
    },
    userPicDrawerContainer: {
        width: 55,
        height: 55,
        borderRadius: 50,
        overflow: 'hidden',
    },
    userPicDrawer: {
        width: 55,
        height: 55
    },
    userNameDrawer:{
        marginLeft: 10,
        fontSize: 20,
        color:"#2d003d"
    }
})


const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    signOut: authActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawerCustom)


