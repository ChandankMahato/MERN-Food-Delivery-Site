import { orderConstants } from "../actions/constants";

const initialState = {
    orders: []
};

//here if you nont specify "state = initState" then you will get following error
//Error: Reducer "product" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.
export default (state = initialState, action) => {
    switch(action.type){
        case orderConstants.GET_CUSTOMER_ORDER_SUCCESS:
            state ={
                ...state,
                orders: action.payload.orders
            }
            break;
    }
    return state; 
}