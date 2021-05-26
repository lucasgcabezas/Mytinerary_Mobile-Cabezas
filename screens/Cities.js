import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions, ActivityIndicator, ToastAndroid } from 'react-native'
import cityActions from '../redux/actions/cityActions'
import Navbar from '../components/Navbar'
import CityCards from '../components/CityCards'
import authActions from '../redux/actions/authActions'

const Cities = (props) => {
    const { loadAllCities, filterCity, citiesFiltered, loading, userLogged } = props

    useEffect(() => { loadAllCities() }, [])

    const getInput = (e) => { filterCity(e) }


    return (
        <>
            <StatusBar backgroundColor='#2d003d' />
            <Navbar props={props} />
            <ScrollView style={styles.scrollCities}>
                <View style={styles.citiesContainer}>
                    <TextInput placeholder="What is the destination of your dreams?" placeholderTextColor="#2d003d99"
                        style={styles.filterCities} onChangeText={getInput} />
                    {
                        loading
                            ? <ActivityIndicator size="large" color="#00ff00" />
                            : citiesFiltered.length === 0
                                ? <Text>No hay ciudades disponibles</Text>
                                : citiesFiltered.map(city => {
                                    return <CityCards key={city._id} city={city} citiesProps={props} />
                                })
                    }
                </View>
            </ScrollView>
        </>
    )
}

let ScreenHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
    scrollCities: {
        height: ScreenHeight,
    },

    citiesContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: ScreenHeight,
        paddingTop: 10
    },

    filterCities: {
        backgroundColor: '#ffffffcc',
        borderColor: '#ffffff',
        borderWidth: 1,
        width: '95%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 20,
        color: '#2d003d',
        marginTop: 5,
        marginBottom: 15,
        fontSize: 16,
        borderColor: '#2d003d',
        borderWidth: 2
    }
})

const mapStateToProps = state => {
    return {
        citiesFiltered: state.cityReducer.citiesFiltered,
        loading: state.cityReducer.loading,
        userLogged: state.authReducer.userLogged,
    }
}

const mapDispatchToProps = {
    loadAllCities: cityActions.allCities,
    filterCity: cityActions.filterCity,
    signOut: authActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
