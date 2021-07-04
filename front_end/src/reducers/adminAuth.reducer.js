import { authConstants } from "../actions/constants";

const initState = {
    adminToken: null,
    admin: {
        fullName: '',
        mobile: '',
        picture:'',
    },
    adminAuthenticate: false,
    adminAuthenticating:false,
    loading: false,
    error: null,
    message: ''
};

export default (state = initState, action) => {

    switch(action.type){
        case authConstants.ADMIN_LOGIN_REQUEST:
            state = {
                ...state,
                adminAuthenticating: true
            }
            break;
        case authConstants.ADMIN_LOGIN_SUCCESS:
            state = {
                ...state,
                admin: action.payload.admin,
                adminToken: action.payload.adminToken,
                adminAuthenticate: true,
                adminAuthenticating: false
            }
            break;
        case authConstants.ADMIN_LOGIN_FAILURE:
            state = {
                ...state,
                adminAuthenticate: false,
                adminAuthenticating: false,
                message:action.message
            }
            break;
        case authConstants.ADMIN_LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.ADMIN_LOGOUT_SUCCESS:
            state = {
                ...initState,
                message:action.message
            }
            break;
        case authConstants.ADMIN_LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            }
            break;
        case authConstants.ADMIN_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.ADMIN_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.message
            }
            break;
        case authConstants.ADMIN_REGISTER_FAILURE:
            state={
                ...state,
                loading: false,
                message:action.message
            }
            break;
    }
    return state;
}