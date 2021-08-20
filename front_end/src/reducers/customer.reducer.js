import { customerConstants } from "../actions/constants";

const initState = {
    customers: [],
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case customerConstants.GET_ALL_CUSTOMER_REQUEST:
            state = {
                ...state,
            }
            break;
        case customerConstants.GET_ALL_CUSTOMER_SUCCESS:
            state = {
                ...state,
                customers: action.payload
            }
            break;
        case customerConstants.GET_ALL_CUSTOMER_FAILURE: 
            state = {
                ...initState
            }
            break;
    }
    return state;
}