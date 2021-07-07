//Admin Starts here
import {authConstants} from "./constants";
import adminAxios from "../helpers/adminAxios"
import { Slide, toast } from "react-toastify";

export const adminLogin = (admin) => {
    return async (dispatch) => {
        try{
            dispatch({ type: authConstants.ADMIN_LOGIN_REQUEST});
            const res = await adminAxios.post(`/admin/signin`, {
                ...admin
            });
            if(res.status === 200){
                const { adminToken, admin} = res.data;
                localStorage.setItem('adminToken', adminToken);
                localStorage.setItem('admin', JSON.stringify(admin));
                dispatch({
                    type: authConstants.ADMIN_LOGIN_SUCCESS,
                    payload: {
                        adminToken, admin
                    }
                });
                toast.success('Welcome to Get Your Food Admin App',{position: "top-left",});
            }else{
                if(res.status === 206){
                    const {message} = res.data;
                    dispatch({
                        type: authConstants.ADMIN_LOGIN_FAILURE,
                    })
                    if(message === 'Admin Does Not Exist!'){
                        toast.warning(message,{position: "top-left", transition: Slide});
                    }else{
                        toast.error(message,{position: "top-left", transition: Slide});
                    }
                }
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const isAdminLoggedIn = () => {
    return async dispatch => {
        try{
            const adminToken = localStorage.getItem('adminToken');
            if(adminToken){
                const admin = JSON.parse(localStorage.getItem('admin'));
                if(admin.role === 'admin'){
                    dispatch({
                        type: authConstants.ADMIN_LOGIN_SUCCESS,
                        payload: {
                            adminToken, admin
                        }
                    });
                }else{
                    console.log('Account Exist, But With Role: USER')
                }
            }else{
                dispatch({
                    type: authConstants.ADMIN_LOGIN_FAILURE,
                    payload: {error: 'Failed To Login'}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const adminSignout = () => {
    return async dispatch => {
        try{
            dispatch({type: authConstants.ADMIN_LOGOUT_REQUEST});
            const res = await adminAxios.post(`/admin/signout`);
            if(res.status === 200){  
                localStorage.removeItem('admin');
                localStorage.removeItem('adminToken');
                const {message} = res.data;
                dispatch({
                    type: authConstants.ADMIN_LOGOUT_SUCCESS,
                });
                toast.success(message,{position: "top-left", transition: Slide});
            }else{
                dispatch({
                    type: authConstants.ADMIN_LOGOUT_FAILURE,
                    payload: {error: res.data.error}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const adminSignup = (admin) => {
    return async (dispatch) => {
        try{
            dispatch({ type: authConstants.ADMIN_REGISTER_REQUEST});
            const res = await adminAxios.post(`/admin/signup`, {
                ...admin
            });
            if(res.status === 201){
                dispatch({
                    type: authConstants.ADMIN_REGISTER_SUCCESS,
                    payload: {message: 'Admin Registered Successfully'}
                });
                toast.success('Admin Registered Successfully ',{position: "top-left", transition: Slide});
            }else{
                if(res.status === 206){
                    const {message} = res.data;
                    dispatch({
                        type: authConstants.ADMIN_REGISTER_FAILURE,
                        message: message
                    })
                }
            }
        }catch(error){
            console.log(error)
        }
    }
}