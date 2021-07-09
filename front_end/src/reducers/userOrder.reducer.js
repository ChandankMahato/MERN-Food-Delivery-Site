import { orderConstants } from "../actions/constants";

const initState = {
    userOrders: [],
    loading: false,
    error: null
};



export default(state = initState, action) => {
    switch(action.type){
        case orderConstants.GET_USER_ORDER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case orderConstants.GET_USER_ORDER_SUCCESS:
            state = {
                ...state,
                userOrders: action.payload.userOrders,
                loading:false,
            }
            break;
        case orderConstants.GET_USER_ORDER_REQUEST:
            state = {
                ...initState
            }
            break;
    }
    return state;
}