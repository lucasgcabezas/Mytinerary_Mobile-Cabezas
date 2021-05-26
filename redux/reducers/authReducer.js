import AsyncStorage from '@react-native-async-storage/async-storage'

const initialState = {
    userLogged: null,
    userAdm: false
}

const authReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'LOG_USER':
            const saveInStorage = async () => {
                const parsedInfo = JSON.stringify({ firstName: action.payload.firstName, userPic: action.payload.userPic })
                try {
                    await AsyncStorage.setItem('userLogged', parsedInfo)
                    await AsyncStorage.setItem('token', action.payload.token)
                } catch (error) {
                    alert(error)
                }
            }
            saveInStorage()
            return { ...state, userLogged: action.payload }

        case 'LOGOUT_USER':
            const clearStorage = async () => {
                try {
                    await AsyncStorage.clear()
                } catch (error) {
                    alert(error)
                }
            }
            clearStorage()
            return { ...state, userLogged: null }

        case 'CHECK_ADMIN':
            return { ...state, userAdm: action.payload }

        default:
            return state
    }
}

export default authReducer

