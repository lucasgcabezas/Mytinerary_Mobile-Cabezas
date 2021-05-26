import React, { useEffect } from 'react'
import { ImageBackground, ScrollView, Text, View, Dimensions, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native"
import { connect } from 'react-redux'
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

import itineraryActions from '../redux/actions/itineraryActions'
import Navbar2 from '../components/Navbar2'


const Itineraries = (props) => {
    const oneCity = props.citiesArray.find(city => city._id === props.route.params)

    useEffect(() => {
        props.loadSelectedItineraries(props.route.params)
        return () => { props.removeItineraries() }
    }, [])

    if (props.preloaderItinerary) {
        return (
            <View style={{ backgroundColor: '#2d003d', width: '100%', height: '100%', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        )
    }


    const counter = element => {
        let arrayElement = []
        for (let i = 0; i < element; i++) { arrayElement.push('e') }
        return arrayElement
    }

    return (
        <>
            <StatusBar backgroundColor='#2d003d' />
            <ImageBackground source={{ uri: oneCity.img }} style={styles.backgroundItineraries} >
                <Navbar2 props={props} />
                <ScrollView style={styles.backgroundFilter}>
                    <View style={styles.itineariesContainer}>
                        <Text style={styles.itinerariesTitle}>{oneCity.name}</Text>
                        {

                            props.selectedItineraries.map(itinerary => {
                              
                                return (
                                    <View key={itinerary._id} style={styles.cardItineraryItineraries}>
                                        <Text style={styles.itinerayCardTitle}>{itinerary.title}</Text>
                                        <View style={styles.priceDurationLike}>
                                            <View style={styles.iconsSection}>
                                                <FontAwesome5 name="money-bill" size={24} color="#90cc90" style={{ marginRight: 5 }} />
                                                {/* <Text>{newPrice}</Text> */}
                                            </View>
                                            <View style={styles.iconsSection}>
                                                <AntDesign name="clockcircle" size={24} color="#72bcd4" style={{ marginRight: 5 }} />
                                                <Text>{itinerary.duration} Hours</Text>
                                            </View>
                                            <View style={styles.iconsSection}>
                                                <AntDesign name='heart' size={24} color="#dd0000" style={{ marginRight: 5 }} />
                                                <Text>{itinerary.likes || ''}</Text>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.buttonViewItinerary}
                                            onPress={() => props.navigation.navigate('itinerary', itinerary)}
                                        >
                                            <Text style={{ color: 'white', fontSize: 17 }} >View more</Text>
                                        </TouchableOpacity >
                                    </View>
                                )
                            })

                        }
                    </View>
                </ScrollView>
            </ImageBackground >
        </>
    )
}

let ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    backgroundItineraries: {
        height: ScreenHeight
    },
    backgroundFilter: {
        minHeight: ScreenHeight,
        backgroundColor: '#2d003dcc',
    },
    itineariesContainer: {
        alignItems: 'center',
        paddingTop: 20
    },
    itinerariesTitle: {
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',

    },
    cardItineraryItineraries: {
        backgroundColor: '#ffffffee',
        marginVertical: 20,
        width: '95%',
        height: 170,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 25,
        borderRadius: 15,

    },
    itinerayCardTitle: {
        color: '#2d003d',
        fontSize: 22,
        fontWeight: 'bold'
    },
    priceDurationLike: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '50%'
    },
    iconsSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonViewItinerary: {
        backgroundColor: '#2d003d',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10
    }
})


const mapStateToProps = state => {
    return {
        selectedItineraries: state.itineraryReducer.selectedItineraries,
        preloaderItinerary: state.itineraryReducer.preloader,
        errorItinerary: state.itineraryReducer.error,
        citiesArray: state.cityReducer.citiesArray
    }
}

const mapDispatchToProps = {
    loadSelectedItineraries: itineraryActions.getItineraries,
    removeItineraries: itineraryActions.removeItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries)