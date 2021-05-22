import { combineReducers } from "redux";
import cityReducer from './cityReducer'

const rootReducer = combineReducers({ cityReducer })

export default rootReducer