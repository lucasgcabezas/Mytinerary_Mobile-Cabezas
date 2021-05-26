import React, { useEffect, useState } from 'react'

import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions, TouchableOpacity  } from 'react-native'

const CityCards = (props) => {
    const { city, citiesProps } = props

    return (
        <View key={city._id} style={styles.cardCities}>
            <ImageBackground source={{ uri: city.img }} style={styles.imgCities}>
                <View style={styles.cardImgColor}>
                    <Text style={styles.cityText}>{city.name}, {city.country}</Text>
                </View>
            </ImageBackground>
            <TouchableOpacity  onPress={()=> citiesProps.navigation.navigate('itineraries', city._id)} style={styles.cardCityButton} >
                <Text style={styles.cardCityButtonText} >View Itineraries</Text>
            </TouchableOpacity >
        </View>
    )
}

const styles = StyleSheet.create({
    cardCities: {
        width: '95%',
        backgroundColor: '#ffffffee',
        backgroundColor: '#2d003d',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden'
    },

    imgCities: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end'
    },

    cardImgColor: {
        position: 'absolute',
        width: '100%',
        height: '15%',
        backgroundColor: '#2d003ddd',
        justifyContent: 'center',
        paddingRight: 10
    },

    cityText: {
        textAlign: 'right',
        width: '100%',
        backgroundColor: '#2d003d15',
        color: '#ffffff',
        fontSize: 18
    },

    cardCityButton: {
        backgroundColor: '#2d003d',
        backgroundColor: '#ffffff11',
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 15,
        borderRadius: 10,
        borderColor: '#ffffffcc',
        borderWidth: 1
    },

    cardCityButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 17,
        
    }
})

export default CityCards