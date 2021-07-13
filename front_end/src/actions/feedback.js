import axios from "../helpers/axios";
import { feedbackConstants } from "./constants";

export const getAllFeedback = () => {
    return async dispatch => {
        try{
            dispatch({ type: feedbackConstants.GET_ALL_FEEDBACK_REQUEST});
            const res = await axios.get(`/get/feedback`);

            const {feedBacks} = res.data;

            if(res.status === 200){
                dispatch({
                    type: feedbackConstants.GET_ALL_FEEDBACK_SUCCESS,
                    payload: feedBacks
                   
                });
            }else{
                dispatch({
                    type: feedbackConstants.GET_ALL_FEEDBACK_FAILURE,
                    payload: { error: res.data.error}
                })
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const deleteFeedback = (payload) => {
    return async dispatch => {
        try{
            console.log(payload);
            dispatch({ type: feedbackConstants.DELETE_FEEDBACK_REQUEST});
            const res = await axios.post(`/delete/feedback`, {payload});
            if(res.status === 202){
                dispatch({ type: feedbackConstants.DELETE_FEEDBACK_SUCCESS});
                return true;
            }else{
                const {error} = res.data;
                dispatch({
                    type: feedbackConstants.DELETE_FEEDBACK_FAILURE,
                    payload: {error}
                });
            }
        }catch(error){
            console.log(error);
        }
    }
}

export const addFeedBack = (payload) => {
    return async dispatch => {
        try{
            const res = await axios.post(`/add/feedback`, {payload});
            dispatch({ type: feedbackConstants.ADD_USER_FEEDBACK_REQUEST});
            if(res.status === 201){
                dispatch({type: feedbackConstants.ADD_USER_FEEDBACK_SUCCESS,
                    payload: {feedback: res.data.feedback}
                });
            }else{
                    dispatch({ type: feedbackConstants.ADD_USER_FEEDBACK_FAILURE,
                    payload: res.data.error
                });
            };
        }catch(error){
            console.log(error);
        }
    }
}