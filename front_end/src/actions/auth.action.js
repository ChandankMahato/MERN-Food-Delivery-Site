import {authConstants, cartConstants} from "./constants";
import axios from "../helpers/axios"
import { Slide, toast } from "react-toastify";

export const userLogin = (user) => {
    return async (dispatch) => {
        try{
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
        }catch(error){
            console.log(error);
        }
    }
}

export const userSignup = (user) => {
    return async (dispatch) => {
        try{
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
        }catch(error){
            console.log(error);
        }
    }
}

export const isUserLoggedIn = () => {
    return async dispatch => {
        try{
            const token = localStorage.getItem('token');
            if(token){
                const user = JSON.parse(localStorage.getItem('user'));
                if(user.role === 'user'){
                    dispatch({
                        type: authConstants.USER_LOGIN_SUCCESS,
                        payload: {
                            token,user
                        }
                    });
                }else{
                   console.log('Account Exist, But with Role: Admin')
                }          
            }else{
                dispatch({
                    type: authConstants.USER_LOGIN_FAILURE,
                    payload: {error: 'Failed To Login'}
                })
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const userSignout = () => {
    return async dispatch => {
        try{
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
        }catch(error){
            console.log(error);
        }
    }
}
