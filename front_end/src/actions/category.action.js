import axios from "../helpers/axios";
import adminAxios from '../helpers/adminAxios';
import { categoryConstants } from "./constants";

export const getAllCategory = () =>{
    return async dispatch => {
        
        dispatch({ type: categoryConstants.GET_ALL_CATEGORIES_REQUEST})
        const res = await axios.get('/category/getCategory');

        console.log(res);
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
    }
}


export const adminAddCategory = (form) => {
    return async dispatch => {
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
    }
}


export const adminUpdateCategories = (form) => { 
    return async dispatch => {
        dispatch({type: categoryConstants.UPDATE_CATEGORIES_REQUEST});
        const res = await adminAxios.post(`/category/update`, form);
        if(res.status === 201){
            dispatch({ type: categoryConstants.UPDATE_CATEGORIES_SUCCESS});
            return true;
        }else{
            const { error } = res.data;
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {error}
            });
        }
    }
}

//action to delete the category
export const adminDeleteCategories = (ids) => {
    return async dispatch => {
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
    }
}