const initialState = {
    selectedItineraries: [],
    oneCity: {},
    preloader: true,
    error: false
}

const itineraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITINERARIES':
            return { ...state, ...action.payload }
            break

        case 'GET_ONECITY':
            return { ...state, ...action.payload }
            break

        case 'ERROR_ITINERARY':
            return { ...state, ...action.payload }
            break

        case 'REMOVE_ITINERARIES':
            return { ...state, ...action.payload }
            break

        default:
            return state
    }
}


export default itineraryReducer