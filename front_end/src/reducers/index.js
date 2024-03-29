
//combining all reducers
import { combineReducers} from 'redux';
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import categoryReducer from './category.reducer';
import productReducer from './product.reducer';
import userReducer from './user.reducer';
import checkoutReducer from './checkout.reducer';
import orderReducer from './order.reducer';
import adminAuthReducer from './adminAuth.reducer';
import userOrderReducer from './userOrder.reducer';
import bannerReducer from './banner.reducer';
import feedbackReducer from './feedback.reducer';
import customerReducer from './customer.reducer';

//creating variable rootReducer
const rootReducer = combineReducers({
    category: categoryReducer,
    product: productReducer,
    auth: authReducer,
    adminAuth: adminAuthReducer,
    user: userReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    order : orderReducer,
    userOrder: userOrderReducer,
    banner: bannerReducer,
    feedback: feedbackReducer,
    customer: customerReducer
});

export default rootReducer;