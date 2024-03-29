import { Slide, toast } from "react-toastify";
import axios from "../helpers/axios";
import { cartConstants, userConstants } from "./constants";

export const getAddress = () => {
    return async dispatch => {
        try {
            const res = await axios.post('/user/getAddress');
            dispatch({ type: userConstants.GET_USER_ADDRESS_REQUEST});
            if(res.status === 200){
                console.log(res);
                const {
                    userAddress: {
                        address
                    }
                } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_SUCCESS,
                    payload: { address }
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: { error }
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addAddress = (payload) => {
    return async dispatch => {
        try {
            const res = await axios.post(`/user/address/create`, {payload});
            dispatch({ type: userConstants.ADD_USER_ADDRESS_REQUEST});
            if(res.status === 201){
                console.log(res);
                const {
                    userAddress: {
                        address
                    }
                } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_SUCCESS,
                    payload: {address}
                });
            }else{
                const { error } = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ADDRESS_FAILURE,
                    payload : {error}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addOrder = (payload) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`/addOrder`, payload);
            dispatch({type: userConstants.ADD_USER_ORDER_REQUEST});
            if(res.status === 201){
                const { order} = res.data;
                dispatch({
                    type: cartConstants.RESET_CART,
                });
                dispatch({
                    type: userConstants.ADD_USER_ORDER_SUCCESS,
                    payload: {order},
                });
                toast.success('Thank You, Your Order Received', {position: 'top-left', transition:Slide});
            }else{
                const {error} = res.data;
                dispatch({
                    type: userConstants.ADD_USER_ORDER_FAILURE,
                    payload: {error},
                });
                toast.success('Something Went Wrong!', {position: 'top-left', transition:Slide});
            }
        }catch(error) {
            console.log(error);
        }
    };
};

export const getOrders = () => {
    return async (dispatch) => {
        try{
            const res = await axios.get(`/getOrders`);
            dispatch({ type: userConstants.GET_USER_ORDER_REQUEST});
            if(res.status === 200){
                console.log(res);
                const {orders} = res.data;
                dispatch({
                    type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
                    payload: {orders},
                });
            }else{
                const {error} = res.data;
                dispatch({
                    type: userConstants.GET_USER_ADDRESS_FAILURE,
                    payload: {error},
                });
            }
        }catch(error) {
            console.log(error);
        }
    };
};

// single order with complete info and delivery location
export const getOrder = (payload) => {
    return async (dispatch) => {
      try {
        const res = await axios.post(`/getOrder`, payload);
        dispatch({ type: userConstants.GET_USER_ORDER_DETAILS_REQUEST });
        if (res.status === 200) {
          console.log(res);
          const { order } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_DETAILS_SUCCESS,
            payload: { order },
          });
        } else {
          const { error } = res.data;
          dispatch({
            type: userConstants.GET_USER_ORDER_DETAILS_FAILURE,
            payload: { error },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
  };