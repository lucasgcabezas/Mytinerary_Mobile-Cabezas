import 'react-native-gesture-handler'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'

import Drawer from './navigation/Drawer'
import Stack from './navigation/Stack'
import Cities from './screens/Cities'
import SignUp from './screens/SignUp'

const myTineraryStore = createStore(rootReducer , applyMiddleware(thunk))


const App = () => {
    return (
        <Provider store={myTineraryStore}>
            <NavigationContainer>
                {/* <Cities /> */}
                {/* <Stack /> */}
                <Drawer />
                {/* <SignUp /> */}
            </NavigationContainer>
        </Provider>

    )
}

export default App


