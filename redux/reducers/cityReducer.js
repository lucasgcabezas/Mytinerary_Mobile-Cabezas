const initialState = {
    citiesArray: [],
    citiesFiltered: [],
    loading: true,
    error: false
}

const cityReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ALL_CITIES':
            return { ...state, ...action.payload }
            break

        case 'FILTER_CITY':
            return {
                ...state,
                citiesFiltered: state.citiesArray.filter(ciudad => ciudad.name.toLowerCase().startsWith(action.payload.toLowerCase().trim()))
            }
            break

        case 'ERROR_CITY':
            return {
                ...state,
                error: action.payload
            }
            break

        default:
            return state
    }
}

export default cityReducer