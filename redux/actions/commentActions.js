import axios from 'axios'

const myAlert = async (alertTitle, alertMessage, alertType) => {
      alert(alertMessage)
}

const commentActions = {

    sendNewComment: (userToken, itineraryId, commentText) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.post('https://cabezas-mytinerary.herokuapp.com/api/comments/' + itineraryId, commentText, {
                    headers: { 'Authorization': 'Bearer ' + userToken }
                })
                if (response.data.success) {
                    return response.data
                } else {
                    myAlert('Error', response.data.error, 'danger')
                }
            } catch {
                console.log('error')
            }
        }
    },

    deleteComment: (userToken, commentId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.delete('https://cabezas-mytinerary.herokuapp.com/api/comment/' + commentId, {
                    headers: { 'Authorization': 'Bearer ' + userToken }
                })
                if (response.data.success) {
                    return response.data.response
                } else {
                    myAlert('Error', response.data.error, 'danger')
                }
            } catch {
                console.log('error')
            }
        }
    },

    editComment: (userToken, commentId, message) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.put('https://cabezas-mytinerary.herokuapp.com/api/comment/' + commentId, message, {
                    headers: { 'Authorization': 'Bearer ' + userToken }
                })
                if (response.data.success) {
                    return response.data.response
                } else {
                    myAlert('Error', response.data.error, 'danger')
                }
            } catch {
                console.log('error')
            }
        }
    }

}
export default commentActions
