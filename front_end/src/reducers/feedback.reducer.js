import { feedbackConstants } from "../actions/constants";

const initState = {
    feedBacks: [],
    error: null
};

export default (state = initState, action) => {
    switch(action.type){
        case feedbackConstants.GET_ALL_FEEDBACK_REQUEST:
            state = {
                ...state,
            }
            break;
        case feedbackConstants.GET_ALL_FEEDBACK_SUCCESS:
            state = {
                ...state,
                feedBacks: action.payload
            }
            break;
        case feedbackConstants.GET_ALL_FEEDBACK_FAILURE: 
            state = {
                ...initState
            }
            break;
        case feedbackConstants.DELETE_FEEDBACK_REQUEST:
            state = {
                ...state,
            }
            break;
        case feedbackConstants.DELETE_FEEDBACK_SUCCESS:
            state = {
                ...state,
            }
            break;
        case feedbackConstants.DELETE_FEEDBACK_FAILURE:
            state = {
                error: action.payload.error
            }
            break;
    }
    return state;
}