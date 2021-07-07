import axios from "../helpers/axios";
import adminAxios from '../helpers/adminAxios';
import { categoryConstants } from "./constants";

export const getAllCategory = () =>{
    return async dispatch => {
        try{
            dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST})
        const res = await axios.get('/category/getCategory');
        if(res.status === 200){
            const {categories} = res.data;

            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categories}
            });
        }else{
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {error: res.data.error}
            });
        }
        }catch(error){
            console.log(error);
        }
    }
}


export const adminAddCategory = (form) => {
    return async dispatch => {
        try{
            dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST});
            const res = await adminAxios.post('/category/create', form);
            if(res.status === 201){
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: {category: res.data.category}
                });
                return true;
            }else{
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                    payload: res.data.error
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}


export const adminUpdateCategories = (form) => { 
    return async dispatch => {
        try{
            dispatch({type: categoryConstants.UPDATE_CATEGORIES_REQUEST});
            const res = await adminAxios.post(`/category/update`, form);
            if(res.status === 201){
                console.log(res.status);
                dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS});
                return true;
            }else{
                const { error } = res.data;
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                    payload: {error}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const adminDeleteCategories = (ids) => {
    return async dispatch => {
        try{
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST});
            const res = await adminAxios.post(`/category/delete`, {
                payload: {
                    ids
                }
            });
            if(res.status === 200){
                dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS});
                return true;
            }else{
                const {error} = res.data;
                dispatch({
                    type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                    payload: {error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}