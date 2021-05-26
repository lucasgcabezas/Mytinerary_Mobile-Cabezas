import 'react-native-gesture-handler'
import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'

import AppContainer from './AppContainer'

const myTineraryStore = createStore(rootReducer, applyMiddleware(thunk))


const App = (props) => {
    return (
        <Provider store={myTineraryStore}>
            <AppContainer />
        </Provider>
    )
}


export default App



