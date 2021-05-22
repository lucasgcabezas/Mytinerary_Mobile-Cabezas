import * as React from 'react';
import { connect } from 'react-redux'
import { Text, View, SafeAreaView, ImageBackground, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


 class MyCarousel extends React.Component {
    constructor(props) {
        super(props);

        console.log('Loading')
        // console.log(this.props.citiesFiltered)

        this.state = {
            activeIndex: 0,
            carouselItems: this.props.citiesToRender
          
        }
    }

    _renderItem({ item, index }) {

        const styles = StyleSheet.create({
            visibleSectionCarousel: {
                height: 400,
                width: 320,
                marginLeft: 30,
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#fffffffe',
            },

            cardCarousel: {
                alignItems: 'center',
                flex: 1,
                width: 300,
                height: 300,
                marginTop: 10,
                justifyContent: 'center',
            },

            cityTitle: {
                fontSize: 10,
                color: 'black',
                width: '100%',
                textAlign: 'center'
            },

            cityButton: {
                backgroundColor: '#d88d1d',
                backgroundColor: '#2d003d',
                width: '100%',
                height: 45,
                justifyContent: 'center',
                paddingHorizontal: 20,
                paddingVertical: 5,
                marginBottom: 20,
                borderRadius: 8,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.49,
                elevation: 12,
            },

            buttonText: {
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 15,
                color: '#ffffff',
            }
        })


        return (
            <View style={styles.visibleSectionCarousel}  >
                <ImageBackground source={{ uri: item.img }} style={styles.cardCarousel}></ImageBackground>
                {/* <Text style={styles.cityTitle}>{item.name}</Text>
                <Text style={styles.cityTitle}>{item.country}</Text> */}
                <Pressable onPress={() => console.log(item.name)} style={{ width: '50%' }} >
                    <View style={styles.cityButton}>
                        {/* <Text style={styles.buttonText} >View more</Text> */}
                        <Text style={styles.buttonText} >Go {item.name}</Text>
                    </View>
                </Pressable>
            </View>

        )
    }

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: 'transparent', paddingTop: 5, height: 450, width: '100%' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <Carousel
                        // layout={"default"}
                        layout={'stack'}
                        layoutCardOffset={18}
                        ref={ref => this.carousel = ref}
                        data={this.state.carouselItems}
                        sliderWidth={300}
                        itemWidth={250}
                        renderItem={this._renderItem}
                        onSnapToItem={index => this.setState({ activeIndex: index })}
                        autoplay={true}
                        loop={true}
                        loopClonesPerSide={4}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const mapStateToProps = state => {
    return {
        citiesFiltered: state.cityReducer.citiesFiltered
    }
}


export default connect(mapStateToProps)(MyCarousel)


























//     state = {

//         citiesCarrousel: [
//             [
//                 { name: 'Barcelona', img: './assets/barcelona.jpg', id: 1 },
//                 { name: 'Buenos Aires', img: './assets/buenosaires.jpg', id: 2 },
//             ],
//             [

//                 { name: 'Berlin', img: './assets/berlin.jpg', id: 3 },
//                 { name: 'Paris', img: './assets/paris.jpg', id: 4 }
//             ],
//             [
//                 { name: 'New York', img: './assets/newyork.jpg', id: 5 },
//                 { name: 'San Andres', img: './assets/sanandres.jpeg', id: 6 },
//             ],
//             [
//                 { name: 'Santorini', img: './assets/santorini.jpg', id: 7 },
//                 { name: 'Tokyo', img: './assets/tokyo.jpg', id: 8 }
//             ],
//             [
//                 { name: 'Abu Dhabi', img: './assets/abudhabi.jpg', id: 9 },
//                 { name: 'Miami', img: './assets/miami.jpg', id: 10 },
//             ],
//             [
//                 { name: 'London', img: './assets/london.jpg', id: 11 },
//                 { name: 'Sydney', img: './assets/sydney.jpg', id: 12 }
//             ]
//         ]
//     }
// }