import { productConstants } from "../actions/constants";

const initState = {
    products: [],
    loading: false,
    error: null
};

export default(state = initState, action) => {
    switch(action.type){
        case productConstants.GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_BY_CATEGORY_FAILURE:
            state = {
                ...initState
            }
        case productConstants.INITIAL_DATA_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case productConstants.INITIAL_DATA_SUCCESS:
            state = {
                ...state,
                products: action.payload.products,
                loading: false,
            }
            break;
        case productConstants.INITIAL_DATA_FAILURE:
            state = {
                ...initState
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_REQUEST:
            state ={
                ...state,
                loading: true,
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_SUCCESS:
            state = {
                ...state,
                products: action.payload.products
            }
            break;
        case productConstants.GET_ALL_PRODUCTS_FAILURE:
            state ={
                ...state,
                ...initState
            }
    }

    return state;
}