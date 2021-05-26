import axios from 'axios'

const myAlert = async (alertTitle, alertMessage, alertType) => {
    alert(alertMessage)
}

const itineraryActions = {
    getItineraries: (cityId) => {
        return (dispatch, getState) => {
            axios.get('https://cabezas-mytinerary.herokuapp.com/api/itineraries/' + cityId)
                .then(response => {
                    if (response.data.success) {
                        dispatch({ type: 'GET_ITINERARIES', payload: { selectedItineraries: response.data.response, error: false, preloader: false } })
                    } else {
                        dispatch({ type: 'ERROR_ITINERARY', payload: { error: true, preloader: false } })
                    }
                })
                .catch(error => myAlert('Error', 'An error happened, please reload the page!', 'danger'))
        }
    },

    getOneCity: (cityId) => {
        return (dispatch, getState) => {
            axios.get('https://cabezas-mytinerary.herokuapp.com/api/city/' + cityId)
                .then(response => {
                    if (response.data.success) {
                        dispatch({ type: 'GET_ONECITY', payload: { oneCity: response.data.response, error: false, preloader: false } })
                    } else {
                        dispatch({ type: 'ERROR_ITINERARY', payload: { error: true, preloader: false } })
                    }
                })
                .catch(error => myAlert('Error', 'An error happened, please reload the page!', 'danger'))
        }
    },

    removeItineraries: () => {
        return (dispatch, getState) => {
            dispatch({ type: 'REMOVE_ITINERARIES', payload: { selectedItineraries: [], preloader: true } })
        }
    },

    checkUser: (itineraryId, user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://cabezas-mytinerary.herokuapp.com/api/checkuser/' + itineraryId, {
                    headers: { 'Authorization': 'Bearer ' + user.token }
                })
                if (response.data.success) {
                    return response.data.response
                } else {
                    myAlert('Error', response.data.error, 'danger')
                }
            } catch (error) {
                myAlert('Error', 'Internal server error, please try later!', 'danger')
            }
        }
    },

    likeItinerary: (itineraryId, user) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://cabezas-mytinerary.herokuapp.com/api/like/' + itineraryId, {
                    headers: { 'Authorization': 'Bearer ' + user.token }
                })
                if (response.data.success) {
                    return response.data.response
                } else {
                    myAlert('Error', response.data.error, 'danger')
                }
            } catch (error) {
                myAlert('Error', 'Internal server error, please try later!', 'danger')
            }
        }
    },

    getActivities: (itineraryId) => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('https://cabezas-mytinerary.herokuapp.com/api/activities/' + itineraryId)
                if (response.data.success) {
                    return response.data.response
                } else {
                    myAlert('Error', response.data.error, 'danger')
                }
            } catch (error) {
                myAlert('Error', 'Internal server error, please try later!', 'danger')
            }
        }
    }
}
export default itineraryActions
