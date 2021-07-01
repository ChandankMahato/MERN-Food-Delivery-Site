import { cartConstants } from "../actions/constants";

const initState = {
    cartItems: {
        // 123: {
        //     _id: 123,
        //     name: 'veg momo',
        //     img: 'some.jpg',
        //     price: 200,
        //     qty: 1,
        // }
    },
    updateingCart: false,
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case cartConstants.ADD_TO_CART_REQUEST:
            state ={
                ...state,
                updateingCart: true
            }
            break;
        case cartConstants.ADD_TO_CART_SUCCESS:
            state = {
                ...state,
                cartItems: action.payload.cartItems,
                updateingCart: false
            }
            break;
        case cartConstants.ADD_TO_CART_FAILURE:
            state ={
                ...state,
                updateingCart: false,
                error: action.payload.error
            }
            break;
        case cartConstants.RESET_CART:
            state = {
                ...initState
            }
            break;
    }
    return state;
}