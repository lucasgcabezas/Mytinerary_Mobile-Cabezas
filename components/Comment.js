import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Image, Alert, TextInput, TouchableOpacity } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import commentActions from '../redux/actions/commentActions';


const Comment = (props) => {

    const { comment, userChecked, setCommentsState } = props

    let userOwner = userChecked.some(commentId => commentId === comment._id)

    const [messageComment, setMessageComment] = useState({ text: comment.text })
    const [editTrigger, setEditTrigger] = useState(false)

    const getInput = (e) => { setMessageComment({ text: e }) }

    const confimrEditComment = async () => {
        let commentsModified = await props.editComment(props.userLogged.token, comment._id, messageComment)
        setCommentsState(commentsModified)
        setEditTrigger(false)
    }

    const sendDeleteComment = () => {
        Alert.alert(
            "Delete comment",
            `Are you sure you want to delete this comment? This cannot be undone.`,
            [
                { text: 'Cancel' },
                {
                    text: 'Delete', onPress: async () => {
                        let commentsFiltered = await props.deleteComment(props.userLogged.token, comment._id)
                        setCommentsState(commentsFiltered)
                    }
                }

            ]
        )
    }

    return (
        <View style={styles.commentContainer}>
            <View style={styles.userPicContainer}>
                <Image source={{ uri: comment.userPic }} style={styles.userPicComment}></Image>
            </View>
            <View style={styles.commentText}>
                <Text style={{ color: '#2d003d', fontWeight: 'bold' }}>{comment.userName}</Text>
                {
                    !editTrigger
                        ? <Text >{comment.text}</Text>
                        : <View style={styles.editCommentContainer}>
                            <TextInput placeholder="Write comment here..." placeholderTextColor='#999999' style={styles.editCommentInput} value={messageComment.text} onChangeText={(e) => getInput(e)} />
                            <TouchableOpacity style={styles.editCommentButton}>
                                <Text style={{ color: 'white' }} onPress={confimrEditComment}>Confirm</Text>
                            </TouchableOpacity >
                        </View>
                }

            </View>
            {
                userOwner
                && <View style={styles.editDelete}>
                    <FontAwesome5 name="edit" size={20} color="#666666" onPress={() => setEditTrigger(!editTrigger)} />
                    <FontAwesome5 name="trash" size={20} color="#666666" onPress={sendDeleteComment} />
                </View>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    commentContainer: {
        backgroundColor: '#ffffff',
        width: '98%',
        flexDirection: 'row',
        minHeight: 70,
        paddingVertical: 5,
        paddingHorizontal: 3,
        borderRadius: 5,
        marginVertical: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    userPicContainer: {
        borderRadius: 50,
        overflow: 'hidden',
        height: 45,
        width: 45
    },
    userPicComment: {
        height: 45,
        width: 45
    },
    commentText: {
        paddingLeft: 10,
        flex: 1
    },
    editDelete: {
        width: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    editCommentContainer: {
        // backgroundColor: 'red',
        alignItems: 'center'
    },
    editCommentInput: {
        backgroundColor: '#eeeeee',
        height: 50,
        width: '100%',
        textAlignVertical: 'top',
        paddingHorizontal: 2,
        paddingVertical: 2,
        borderRadius: 5
    },
    editCommentButton: {
        // width: 50,
        backgroundColor: 'yellow',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#2d003d',
        marginTop: 5

    }
})

const mapStateToProps = state => {
    return {
        userLogged: state.authReducer.userLogged
    }
}

const mapDispatchToProps = {
    deleteComment: commentActions.deleteComment,
    editComment: commentActions.editComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)