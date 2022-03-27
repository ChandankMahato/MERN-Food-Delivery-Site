import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Cart from './containers/Cart';
import CheckoutPage from './containers/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import About from './containers/About';

import { getAdminInitialData, getUserOrders, isAdminLoggedIn, isUserLoggedIn, updateCart } from './actions';
import AdminAccountSignin from './containers/Admin/Signin';
import AdminAccountSignup from './containers/Admin/Signup';
import PrivateRoute from './components/Admin/HOC/PrivateRoute';
import AdminHome from './containers/Admin/AdminHome';
import AdminCategory from './containers/Admin/Category';
import AdminProducts from './containers/Admin/Products';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KOT from './containers/Admin/KOT';
import BILL from './containers/Admin/BILL';
import AdminOrderStatistics from './containers/Admin/Orders/OrderStatistics_index';
import AdminOrderAction from './containers/Admin/Orders/OrderAction_index';
import PageNotFound from './containers/404';
import Order from './containers/Orders';
import PrivateRouteUser from './components/HOC/PrivateRoute';
import AdminBanner from './containers/Admin/Banner';
import UserAccountSignin from './containers/Signin';
import UserAccountSignup from './containers/Signup';
import Feedbacks from './containers/Admin/Feedback';
import Footer from './components/Footer';
import Customers from './containers/Admin/Users';
import ExportData from './containers/Admin/ExportData';

toast.configure();

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const adminAuth = useSelector(state => state.adminAuth);

  const [check, setCheck] = useState(false);

  var currentUrl = window.location.href;
  var params = currentUrl.split('https://buddha-suddha.herokuapp.com/')[1];
  // var params = currentUrl.split('http://localhost:3000/')[1];
  
  useEffect(() => {
    if(params === "admin/signin" || 
       params === "admin/signup" ||
       params === "admin/home" || 
       params === "admin/banner" || 
       params === "admin/products" ||
       params === "feedback" ||
       params === "admin/category" || 
       params === "admin/orders/statistics" ||
       params === "admin/orders/actions" ||
       params === "admin/KOT" || 
       params === "admin/BILL" ||
       params === "admin/signup" ||
       params === "admin/export" ||
       params === "admin/customers"){
      setCheck(true);
    }
  },[params])

  useEffect(() => {
    if(!auth.userAuthenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(updateCart);
    dispatch(getUserOrders());
  },[auth.userAuthenticate]);

  useEffect(() => {
    if(!adminAuth.adminAuthenticate){
      dispatch(isAdminLoggedIn());
    }
    dispatch(getAdminInitialData());
  },[adminAuth.adminAuthenticate]);
  
 
  return (
    <>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={UserAccountSignin} />
            <Route path="/register" component={UserAccountSignup} />
            <Route path="/cart" component={Cart} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/about" component={About} />
            <PrivateRouteUser path="/order" component={Order}/>
            
            {/* admin starts here */}
            <PrivateRoute path="/admin/KOT" component={KOT}/>
            <PrivateRoute path="/admin/home" exact component={AdminHome}/>
            <PrivateRoute path="/admin/banner" component={AdminBanner} />
            <PrivateRoute path="/admin/category" component={AdminCategory}/>
            <PrivateRoute path="/admin/products"component={AdminProducts} />
            <PrivateRoute path="/feedback" component={Feedbacks}/>
            <PrivateRoute path="/admin/orders/statistics" component={AdminOrderStatistics}/>
            <PrivateRoute path="/admin/BILL" component={BILL}/>
            <PrivateRoute path="/admin/orders/actions" component={AdminOrderAction}/>
            <Route path="/admin/signin" component={AdminAccountSignin}/>
            <PrivateRoute path="/admin/signup" component={AdminAccountSignup}/>
            <PrivateRoute path="/admin/customers" component={Customers}/>
            <PrivateRoute path="/admin/export" component={ExportData}/>
            <Route component={PageNotFound}/>
          </Switch>
        </Router>
        <ToastContainer 
          autoClose= {5000}
          hideProgressBar= {false}
          closeOnClick= {true}
          pauseOnHover= {true}
          draggable= {true}
          progress= {undefined}
        />
      </div>
      <div>
        {!check ?<Footer/> : null }
      </div>
 </>
  );
}

export default App;
