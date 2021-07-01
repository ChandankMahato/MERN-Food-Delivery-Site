import {authConstants, cartConstants} from "./constants";
import axios from "../helpers/axios"
import { Slide, toast } from "react-toastify";


toast.configure();

//USER Starts here
export const userLogin = (user) => {
    
    return async (dispatch) => {
        dispatch({ type: authConstants.USER_LOGIN_REQUEST});

        const res = await axios.post(`/user/signin`, {
            ...user
        });

        if(res.status === 200){
            const { token, user} = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: {
                    token, user,
                },
            })
            toast.success('Welcome to Get Your Food',{position: "top-left", transition: Slide});
        }else{
            if(res.status === 206){
                const {message} = res.data;
                dispatch({
                    type: authConstants.USER_LOGIN_FAILURE,
                })
                if(message === 'User Does Not Exist!'){
                    toast.warning(message+' Register New Account',{position: "top-left", transition: Slide});
                }else{
                    toast.error(message,{position: "top-left",});
                }if(res.status === 400){
                    toast.error('Something Went Wrong',{position: "top-left", transition: Slide});
                }
            }
        }
    }
}

export const userSignup = (user) => {
    return async (dispatch) => {
        dispatch({ type: authConstants.USER_REGISTER_REQUEST});

        const res = await axios.post(`/user/signup`, {
            ...user
        });

        if(res.status === 201){
            dispatch({
                type: authConstants.USER_REGISTER_SUCCESS,
                payload: {message: 'User Registered Successfully'}
            });
            toast.success('User Registered Successfully',{position: "top-left", transition: Slide});
            dispatch(userLogin(user));
        }else{
            if(res.status === 206){
                const {message} = res.data;
                dispatch({
                    type: authConstants.USER_REGISTER_FAILURE,
                })
                toast.warning(message,{position: "top-left", transition: Slide});
            }
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.USER_LOGIN_SUCCESS,
                payload: {
                    token,user
                }
            });
        }else{
            dispatch({
                type: authConstants.USER_LOGIN_FAILURE,
                payload: {error: 'Failed To Login'}
            })
        }
    }
}

export const userSignout = () => {
    return async dispatch => {
        dispatch({ type: authConstants.USER_LOGOUT_REQUEST});
        const res = await axios.post('/user/signout');
        if(res.status === 200){
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            const {message} = res.data;
            dispatch({
                type: authConstants.USER_LOGOUT_SUCCESS,
            });
            toast.success(message,{position: "top-left", transition: Slide});
            dispatch({ type: cartConstants.RESET_CART});
        }else{
            dispatch({
                type: authConstants.USER_LOGOUT_FAILURE,
                payload: {error: res.data.error}
            });
        }
    }
}


//Admin Starts here

export const adminLogin = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({ type: authConstants.ADMIN_LOGIN_REQUEST});

        const res = await axios.post(`/admin/signin`, {
            ...user
        });

        if(res.status === 200){
            const { token, user} = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.ADMIN_LOGIN_SUCCESS,
                payload: {
                    token, user
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
    }
}

export const isAdminLoggedIn = () => {
    return async dispatch => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.ADMIN_LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }else{
            dispatch({
                type: authConstants.ADMIN_LOGIN_FAILURE,
                payload: {error: 'Failed To Login'}
            });
        }
    }
}

export const adminSignout = () => {
    return async dispatch => {

        dispatch({type: authConstants.ADMIN_LOGOUT_REQUEST});
        const res = await axios.post(`/admin/signout`);

        if(res.status === 200){  
            localStorage.clear();
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
    }
}


export const adminSignup = (user) => {

    console.log(user);

    return async (dispatch) => {

        dispatch({ type: authConstants.ADMIN_REGISTER_REQUEST});

        const res = await axios.post(`/admin/signup`, {
            ...user
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
    }
}