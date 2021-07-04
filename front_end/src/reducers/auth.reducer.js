import { authConstants } from "../actions/constants";

const initState = {
    token: null,
    user: {
        fullName: '',
        mobile: '',
        picture: '',
    },
    userAuthenticate: false,
    userAuthenticating: false,
    loading: false,
    error: null,
    message: ''
};

export default (state = initState, action) => {

    switch(action.type){
        //user starts here....
        case authConstants.USER_LOGIN_REQUEST:
            state = {
                ...state,
                userAuthenticating: true
            }
            break;
        case authConstants.USER_LOGIN_SUCCESS:
                state = {
                    ...state,
                    user: action.payload.user,
                    token: action.payload.token,
                    message:action.message,
                    userAuthenticate: true,
                    userAuthenticating: false
                }
                break;
        case authConstants.USER_LOGIN_FAILURE:
            state = {
                ...state,
                userAuthenticate: false,
                userAuthenticating: false,
                message: action.message
            }
            break;
        case authConstants.USER_LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.USER_LOGOUT_SUCCESS:
            state = {
                ...initState,
                message:action.message
            }
            break;
        case authConstants.USER_LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case authConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case authConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                message: action.message
            }
            break;
    }
    return state;
}