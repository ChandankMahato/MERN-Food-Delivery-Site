//here we are creating store
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
//importing rootReducer
import rootReducer from '../reducers';


//here we are going to store our rootReducer
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;