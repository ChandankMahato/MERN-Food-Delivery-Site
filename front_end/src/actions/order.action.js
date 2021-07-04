import adminAxios from "../helpers/adminAxios";
import axios from "../helpers/axios";
import { orderConstants } from "./constants";

export const adminGetCustomerOrders = () => {
    return async (dispatch) => {
        dispatch({ type: orderConstants.GET_CUSTOMER_ORDER_REQUEST});
        const res = await axios.post(`/admin/getOrder`);
        if(res.status === 200){
            const { orders} = res.data;
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: {orders},
            });
        }else{
            const { error } = res.data;
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_FAILURE,
                payload: {error},
            });
        }
    }
}

export const adminUpdateOrder = (payload) => {
    return async (dispatch) => {
        dispatch({type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST});
        try{
            const res = await adminAxios.post(`/admin/order/update`, payload);
            if(res.status === 201){
                dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS});
            }else{
                const {error} = res.data;
                dispatch({
                    type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
                    payload: {error},
                });
            }
        }catch(error){
            console.log(error)
        }
    }
    
}