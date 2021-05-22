// const initialState = {
//     userLogged: null,
//     userAdm: false
// }

// const authReducer = (state = initialState, action) => {

//     switch (action.type) {
//         case 'LOG_USER':
//             localStorage.setItem('userLogged', JSON.stringify({ firstName: action.payload.firstName, userPic: action.payload.userPic }))
//             localStorage.setItem('token', action.payload.token)
//             return { ...state, userLogged: action.payload }

//         case 'LOGOUT_USER':
//             localStorage.clear()
//             return { ...state, userLogged: null }

//         case 'CHECK_ADMIN':
//             // console.log(action.payload)
//             return { ...state, userAdm: action.payload }

//         default:
//             return state
//     }
// }

// export default authReducer

