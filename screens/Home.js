import React from 'react'
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, ImageBackground } from 'react-native'

const Home = (props) => {
    return (
        <View style={styles.homeConteiner}>
            <View style={styles.logosContainer}>

                <Image source={require('../assets/logoImg.png')} style={styles.logoImg}></Image>
                <ImageBackground source={require('../assets/isologo.png')} style={styles.logoText} />
            </View>
            <Text style={styles.buttonHome} onPress={()=> props.navigation.navigate('cities')}>Lets go!</Text>
        </View>

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

    buttonHome: {
        color: 'white',
        fontSize: 30,
        backgroundColor: '#2d003d',
        width: '70%',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 70,
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    }

})

export default Home


