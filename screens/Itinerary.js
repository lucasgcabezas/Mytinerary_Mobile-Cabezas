import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Dimensions, ScrollView, View, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity } from "react-native"
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'

import itineraryActions from '../redux/actions/itineraryActions'
import Navbar2 from '../components/Navbar2'
import Comment from '../components/Comment'
import commentActions from '../redux/actions/commentActions'


const Itinerary = (props) => {
    const { authorName, authorPic, duration, hashtags, img, likes, price, title, _id, comments } = props.route.params

    const [userChecked, setUserChecked] = useState([])
    const [itineraryLike, setItineraryLike] = useState({ likesCount: likes, liked: false, repeatLikeFilter: false })
    const [commentsState, setCommentsState] = useState(comments)
    const [commentText, setCommentText] = useState({ text: '' })
    const [activitiesState, setActivitiesState] = useState({ activities: [], preloader: true })

    let heartIconClass = itineraryLike.liked ? "heart" : "hearto"

    const getInput = (e) => { setCommentText({ text: e }) }

    useEffect(() => {
        viewMoreLess()
        checkOwnerUser()
    }, [])

    const checkOwnerUser = async () => {
        if (props.userLogged) {
            const response = await props.checkUser(_id, props.userLogged)
            setUserChecked(response.arrayOwnerCheck)
            if (response.likedChek) {
                setItineraryLike({ ...itineraryLike, liked: true })
            }
        }
    }

    const sendIikeItinerary = async () => {
        if (!itineraryLike.repeatLikeFilter && props.userLogged) {
            await setItineraryLike({ ...itineraryLike, repeatLikeFilter: true, liked: true })
            const response = await props.likeItinerary(_id, props.userLogged)
            setItineraryLike({ likesCount: response.likes, liked: response.liked, repeatLikeFilter: false })
        } else if (!props.userLogged) {
            alert('You need to be logged for like this itinerary!')
        }
    }

    const counter = element => {
        let arrayElement = []
        for (let i = 0; i < element; i++) { arrayElement.push('e') }
        return arrayElement
    }

    const viewMoreLess = async () => {
        const response = await props.getActivities(_id)
        setActivitiesState({ activities: response, preloader: false })
    }

    const sendComment = async () => {
        if (commentText.text.length === 0) {
            alert('Please complete the field to send a comment. ')
        } else if (props.userLogged) {
            let newComments = await props.sendNewComment(props.userLogged.token, _id, commentText)
            setCommentsState(newComments.response)
            setCommentText({ text: '' })
            setUserChecked(newComments.arrayOwnerCheck)
        } else {
            alert('You need to be logged for comment this itinerary!')
        }
    }

    return (
        <>
            <Navbar2 props={props}>
            </Navbar2>

            <ScrollView style={styles.scrollItinerary} style={styles.scrollItinerary} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.itineraryContainerScreen}>
                    <ImageBackground source={{ uri: img }} style={styles.itineraryBackground}>
                        <View style={styles.itineraryTitleContainer}>
                            <Text style={styles.itineraryTitle}>{title}</Text>
                        </View>
                        <View style={styles.authorImgContainer}>
                            <Image source={{ uri: authorPic }} style={styles.authorImg} />
                        </View>
                    </ImageBackground>
                    <Text style={styles.authorNameText}>{authorName}</Text>

                 

                    <View style={styles.priceDurationLike}>
                        <View style={styles.iconsSection}>
                            {
                                counter(price).map((c, i) => <FontAwesome5 key={i} name="money-bill" size={24} color="#90cc90" style={{ marginRight: 5 }} />)
                            }
                            {/* <FontAwesome5 name="money-bill" size={24} color="#90cc90" /> */}
                        </View>
                        <View style={styles.iconsSection}>
                            <AntDesign name="clockcircle" size={24} color="#72bcd4" style={{ marginRight: 5 }} /><Text>{duration} Hours</Text>
                        </View>
                        <View style={styles.iconsSectionLike}>
                            <AntDesign name={heartIconClass} size={24} color="#dd0000" style={{ marginRight: 5 }} onPress={sendIikeItinerary} />
                            <Text>{itineraryLike.likesCount || ''}</Text>
                        </View>
                    </View>

                    <View style={{flexDirection: 'row',marginTop: 5, marginBottom: 20}}>
                        {
                            hashtags.map(hash =>{
                                return <Text style={{marginRight: 5, color: '#999999'}}>#{hash}</Text>
                            })
                        }
                    </View>

                    <Text style={styles.sectionTitleItinerary}>Activities</Text>
                    <View style={styles.activitiesContainer}>
                        <ScrollView horizontal={true} style={styles.activitiesScroll}>
                            {
                                activitiesState.activities.map(activity => {
                                    return (
                                        <View key={activity._id} style={styles.activityImgContainer}>
                                            <ImageBackground source={{ uri: activity.img }} style={styles.activityImg}>
                                                <View style={styles.activityTitleContainer}>
                                                    <Text style={styles.activityTitle}>{activity.name}</Text>
                                                </View>
                                            </ImageBackground>
                                        </View>
                                    )
                                })
                            }

                        </ScrollView>
                    </View>
                    <Text style={styles.sectionTitleItinerary}>Comments</Text>
                    <ScrollView style={styles.scrolLComments}>
                        <View style={styles.commentsContainer}>
                            {
                                commentsState.map(comment => {
                                    return <Comment key={comment._id} comment={comment} userChecked={userChecked}  commentsState={commentsState} setCommentsState={setCommentsState}/>
                                })
                            }
                        </View>
                    </ScrollView>
                    <View style={styles.sendCommentContaner}>
                        <TextInput placeholder="Write comment here..." placeholderTextColor='#999999' style={styles.sendCommentInput} value={commentText.text} onChangeText={(e) => getInput(e)} />
                        <TouchableOpacity style={styles.sendCommentButton} onPress={sendComment} keyboardDismissMode={'on-drag'} >
                            <Text style={{ color: 'white', fontSize: 17 }}>Send</Text>
                        </TouchableOpacity  >
                    </View>
                </View>
            </ScrollView>
        </>
    )
}

let ScreenHeight = Dimensions.get("window").height

const styles = StyleSheet.create({
    scrollItinerary: {
        height: ScreenHeight,
        width: '100%',
        backgroundColor: '#ffffff'
    },
    itineraryContainerScreen: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    itineraryBackground: {
        width: '100%',
        height: 175,
        alignItems: 'center',
        backgroundColor: '#2d003d',
        marginBottom: 75,
        paddingTop: 25
    },
    itineraryTitleContainer: {
        backgroundColor: '#2d003dbb',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#ffffff'
    },
    itineraryTitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 20
    },
    authorImgContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: '#ffffff',
        borderWidth: 5,
        position: 'absolute',
        bottom: -75
    },
    authorImg: {
        width: 150,
        height: 150,
    },
    authorNameText: {
        color: '#2d003d',
        fontSize: 25,
    },
    priceDurationLike: {
        flexDirection: 'row',
        width: '95%',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        paddingHorizontal: 10,
        // backgroundColor: 'yellow'
    },
    iconsSection: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
        // width: '33%',
        flexDirection: 'row'
    },
    iconsSectionLike: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlignVertical: 'center',
        width: '12%',
        flexDirection: 'row'
    },
    activitiesContainer: {
        height: 200,
        width: '100%'
    },
    activitiesScroll: {
        height: 20,
        width: '100%',
        backgroundColor: '#2d003d',
        backgroundColor: '#ffffff',
        paddingVertical: 10
    },
    activityImgContainer: {
        width: 200,
        height: '100%',
        backgroundColor: 'white',
        marginHorizontal: 5,
        overflow: 'hidden',
        borderRadius: 10
    },
    activityImg: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    activityTitleContainer: {
        width: '100%',
        backgroundColor: '#000000aa',
        backgroundColor: '#2d003daa',
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        height: 30
    },
    activityTitle: {
        color: '#ffffff',
        width: '100%',
        textAlign: 'center',
        fontSize: 16
    },




    scrolLComments: {
        backgroundColor: '#eeeeee',
        minHeight: 150,
        // maxHeight: 400,
        width: '100%',
        marginBottom: 10
    },
    commentsContainer: {
        width: '100%',
        minHeight: 150,
        // maxHeight: 400,
        alignItems: 'center'
    },




    sectionTitleItinerary: {
        color: '#2d003d',
        fontSize: 22,
        marginBottom: 5,
        marginTop: 15
    },
    sendCommentContaner: {
        // backgroundColor: 'red',
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 10,
        height: 60,
        marginBottom: 10
    },
    sendCommentInput: {
        flex: 1,
        backgroundColor: '#eeeeee',
        marginRight: 5,
        paddingHorizontal: 10,
        color: '#2d003d',
        borderRadius: 10,


    },
    sendCommentButton: {
        backgroundColor: '#2d003d',
        textAlignVertical: 'center',
        paddingHorizontal: 25,
        borderRadius: 10,
        justifyContent: 'center'
    },

})


const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    sendNewComment: commentActions.sendNewComment,
    likeItinerary: itineraryActions.likeItinerary,
    checkUser: itineraryActions.checkUser,
    getActivities: itineraryActions.getActivities
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)
