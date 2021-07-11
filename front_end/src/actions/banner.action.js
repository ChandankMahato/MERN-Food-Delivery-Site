import axios from "../helpers/axios";
import adminAxios from "../helpers/adminAxios";
import {bannerConstants } from "./constants";

export const addBanner = (form) => {
    return async dispatch => {
        try{
            dispatch({ type: bannerConstants.ADD_BANNER_REQUEST});
            const res = await adminAxios.post(`add/banner`, form);
            if(res.status === 201){
                dispatch({
                    type: bannerConstants.ADD_BANNER_SUCCESS,
                    payload: {banner: res.data.banner}
                });
                return true;
            }else{
                dispatch({
                    type: bannerConstants.ADD_BANNER_FAILURE,
                    payload: res.data.error
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const getAllBanner = () => {
    return async dispatch => {
        try{
            dispatch({ type: bannerConstants.GET_ALL_BANNER_REQUEST});
            const res = await axios.get(`/getBanner`);
            if(res.status === 200){
                dispatch({
                    type: bannerConstants.GET_ALL_BANNER_SUCCESS,
                    payload: res.data
                });
            }else{
                dispatch({
                    type: bannerConstants.GET_ALL_BANNER_FAILURE,
                    payload: {error: res.data.error}
                })
            };
        }catch(error){
            console.log(error);
        }
    }
}

export const deleteBanners = (ids) => {
    return async dispatch => {
        try{
            dispatch({type: bannerConstants.DELETE_BANNER_REQUEST});
            const res = await adminAxios.post(`/banner/delete`,{
                payload: {
                    ids
                }
            });
            if(res.status === 200){
                dispatch({ type: bannerConstants.DELETE_BANNER_SUCCESS});
                return true;
            }else{
                const {error} = res.data;
                dispatch({
                    type: bannerConstants.DELETE_BANNER_FAILURE,
                    payload: {error}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}