import adminAxios from "../helpers/adminAxios";
import axios from "../helpers/axios";
import { productConstants, categoryConstants, orderConstants } from "./constants";

export const getUserProductByCategory = (categoryId) => {

    return async dispatch => {
        try{
            dispatch({type: productConstants.GET_ALL_PRODUCTS_BY_CATEGORY_REQUEST})
            const res = await axios.post(`/getProduct/categoryId`, {categoryId});
            if(res.status === 200){
                console.log(res.data);
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS,
                    payload: res.data
                })
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getUserInitialData = () => {
    return async dispatch => {
        try{
            dispatch({type: productConstants.INITIAL_DATA_REQUEST})
            const res = await axios.get(`/user/initialdata`);
            if(res.status === 200){
                dispatch({
                    type: productConstants.INITIAL_DATA_SUCCESS,
                    payload: (res.data)
                })
            }else{
                dispatch({
                    type: productConstants.INITIAL_DATA_FAILURE,
                    payload: {error: res.data.error}
                })
            }
        }catch(error){
            console.log(error);
        }
    }
}


export const getAdminProducts = () => {
    return async (dispatch) => {
        try{
            dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST});
            const res = await adminAxios.get(`/products/getProducts`);
            if(res.status === 200){
                const {products} = res.data;
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: {products},
                });
            }else{
                dispatch({type: productConstants.GET_ALL_PRODUCTS_FAILURE});
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addAdminProduct = (payload) => {
    return async (dispatch) => {
        try{
            dispatch({ type: productConstants.ADD_PRODUCT_REQUEST});
            const res = await adminAxios.post(`/product/create`,payload);
            if(res.status === 201){
               dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS});
               return true;
            } else{
                dispatch({ type: productConstants.ADD_PRODUCT_FAILURE});
            }
        }catch(error){
            console.log(error);
        }
    };
};

export const adminUpdateProduct = (payload) => {
    return async (dispatch)=>{
        try{
            dispatch({type:productConstants.PRODUCT_EDIT_REQUEST});
            const res = await adminAxios.post(`/Product/updateProduct`, payload);
            if(res.status === 202){
                dispatch({type: productConstants.PRODUCT_EDIT_SUCCESS});
                return true;
            }else{
                dispatch({type: productConstants.ADD_PRODUCT_FAILURE});
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const deleteAdminProductById = (payload) => {
    return async(dispatch) => {
        try{
            dispatch({type: productConstants.DELETE_PRODUCT_BY_ID_REQUEST});
            const res = await adminAxios.post(`/products/delete`,{
               payload
            });
            if(res.status === 202){
                dispatch({ type: productConstants.DELETE_PRODUCT_BY_ID_SUCCESS});
                return true;
            }else{
                const { error } = res.data;
                dispatch({
                    type: productConstants.DELETE_PRODUCT_BY_ID_FAILURE,
                    payload: {
                        error,
                    }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}


export const getAdminInitialData = () => {
    return async dispatch => {
        try{
            const res = await adminAxios.post(`/initialData`);
            if(res.status === 200){
                const { categories, products, orders} = res.data;
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: { categories }
                });
                dispatch({
                    type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                    payload: { products }
                });
                dispatch({
                    type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                    payload: {orders},
                });
            }
        }catch(error){
            console.log(error);
        }
    };
};