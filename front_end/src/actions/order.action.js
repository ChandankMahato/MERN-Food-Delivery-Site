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

// export const adminUpdateOrder = (payload) => {
//     dispatch({type: orderConstants.UPDATE_CUSTOMER_ORDER_REQUEST});
//     const res = await axios.post(`/updateorder`, payload);
//     if(res.statsu === 201){
//         dispatch({ type: orderConstants.UPDATE_CUSTOMER_ORDER_SUCCESS});
//         dispatch(getCustomerOrders());
//     }else{
//         const {error} = res.data;
//         dispatch({
//             type: orderConstants.UPDATE_CUSTOMER_ORDER_FAILURE,
//             payload: {error},
//         });
//     }
// }