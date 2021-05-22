import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground, TextInput, Dimensions } from 'react-native'
import cityActions from '../redux/actions/cityActions'
import Navbar from '../components/Navbar'

const Cities = (props) => {
    const { loadAllCities, filterCity, citiesFiltered, loading } = props

    useEffect(() => { loadAllCities() }, [])

    const getInput = (e) => {
        filterCity(e)
    }

    return (
        <>
            <StatusBar backgroundColor='#2d003d' />
            <Navbar props={props} />
            <ScrollView style={styles.scrollCities}>
                <View style={styles.citiesContainer}>
                    <TextInput
                        placeholder="What is the destination of your dreams?"
                        placeholderTextColor="#2d003d99"
                        style={styles.filterCities}
                        onChangeText={getInput}
                    />
                    {loading
                        ? <Text>Loading</Text>
                        : citiesFiltered.length === 0
                            ? <Text>No hay ciudades disponibles</Text>
                            : citiesFiltered.map(city => {
                                return <View style={styles.cardCities} key={city._id}>
                                    <Image source={{ uri: city.img }} style={styles.imgCities}>
                                    </Image>
                                    <Text style={styles.cityTitle}>{city.name}</Text>
                                    {/* <Text>{city.country}</Text> */}
                                </View>
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
        // flex: 1,
        height: ScreenHeight,

    },

    citiesContainer: {
        flex: 1,
        backgroundColor: '#2d003d',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: ScreenHeight,
        paddingTop: 10
    },

    filterCities: {
        backgroundColor: '#ffffffcc',
        borderColor: '#ffffff',
        borderWidth: 1,
        width: '90%',
        height: 50,
        borderRadius: 10,
        paddingLeft: 20,
        color: '#2d003d',
        marginTop: 5,
        marginBottom: 15,
        fontSize: 16

    },

    cardCities: {
        width: '90%',
        backgroundColor: '#ffffffee',
        justifyContent: 'center',
        alignItems: 'center',
        // paddingHorizontal: 10,
        // paddingTop: 10,
        marginVertical: 20,
        

    },

    imgCities: {
        width: '95%',
        height: 200,
        // marginHorizontal: 10,
        marginVertical: 10

    },

    cityTitle: {
        // marginVertical: 30,
        paddingVertical: 15,
        textAlign: 'center',
        width: '100%',
        backgroundColor: '#2d003d15',
        color: '#ffffff',
        color: '#2d003d',
        fontSize: 40
    }
})


const mapStateToProps = state => {
    return {
        citiesFiltered: state.cityReducer.citiesFiltered,
        loading: state.cityReducer.loading
    }
}

const mapDispatchToProps = {
    loadAllCities: cityActions.allCities,
    filterCity: cityActions.filterCity
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)
