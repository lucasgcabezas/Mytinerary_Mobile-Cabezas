import { combineReducers } from "redux";
import cityReducer from './cityReducer'
import authReducer from './authReducer'
import itineraryReducer from './itineraryReducer'
import commentReducer from './commentReducer'

const rootReducer = combineReducers({ cityReducer, authReducer, itineraryReducer, commentReducer })

export default rootReducer