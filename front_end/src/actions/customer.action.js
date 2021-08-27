import adminAxios from '../helpers/adminAxios';
import { customerConstants } from "./constants";
import { toast, Zoom } from "react-toastify";


export const getAllCustomerDetails = () => {
    return async dispatch => {
        try{
            dispatch({ type: customerConstants.GET_ALL_CUSTOMER_REQUEST});
            const res = await adminAxios.get(`/admin/customerDetails`);

            const {Customers} = res.data;

            if(res.status === 200){
                dispatch({
                    type: customerConstants.GET_ALL_CUSTOMER_SUCCESS,
                    payload: Customers
                   
                });
            }else{
                dispatch({
                    type: customerConstants.GET_ALL_CUSTOMER_FAILURE,
                    payload: { error: res.data.error}
                })
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addResetCode = (payload) => {
    return async dispatch => {
        try{
            dispatch({ type: customerConstants.RESET_REQUEST});
            const res = await adminAxios.post(`/admin/resetCode`, {payload});
            if(res.status === 201){
                dispatch({type: customerConstants.RESET_SUCCESS});
                toast.success('Password Reset Code Sent Successfully',{position: "top-center", transition: Zoom});
            }else{
                dispatch({type: customerConstants.RESET_FAILURE});
                toast.error('Something Went Wrong',{position: "top-center", transition: Zoom});
            }
        }catch(error){
            console.log(error);
            toast.error('Something Went Wrong',{position: "top-center", transition: Zoom});
        }
    }
}


export const deleteCustomerById = (payload) => {
    return async(dispatch) => {
        try{
            dispatch({type: customerConstants.DELETE_ACCOUNT_BY_ID_REQUEST});
            const res = await adminAxios.post(`/customer/delete`,{
               payload
            });
            if(res.status === 202){
                dispatch({ type: customerConstants.DELETE_ACCOUNT_BY_ID_SUCCESS});
                return true;
            }else{
                const { error } = res.data;
                dispatch({
                    type: customerConstants.DELETE_ACCOUNT_BY_ID_FAILURE,
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