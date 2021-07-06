import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Cart from './containers/Cart';
import CheckoutPage from './containers/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import About from './containers/About';

import { getAdminInitialData, isAdminLoggedIn, isUserLoggedIn, updateCart } from './actions';
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

toast.configure();

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const adminAuth = useSelector(state => state.adminAuth);

  const [check, setCheck] = useState(false);

  var currentUrl = window.location.href;
  var params = currentUrl.split('3000/')[1];
  console.log('hello');
  
  useEffect(() => {
    if(params === "admin/signin" || 
       params === "admin/signup" ||
       params === "admin/home" || 
       params === "admin/products" ||
       params === "admin/category" || 
       params === "admin/orders/statistics" ||
       params === "admin/orders/actions" ||
       params === "admin/KOT" || 
       params === "admin/BILL"){
      setCheck(true);
    }
  },[params])

  useEffect(() => {
    if(!auth.userAuthenticate){
      dispatch(isUserLoggedIn());
    }
    dispatch(updateCart);
  },[auth.userAuthenticate]);

  useEffect(() => {
    if(!adminAuth.adminAuthenticate){
      dispatch(isAdminLoggedIn());
    }
    dispatch(getAdminInitialData());
  },[adminAuth.adminAuthenticate]);
  
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/about" component={About} />

          {/* admin starts here */}
          <PrivateRoute path="/admin/KOT" component={KOT}/>
          <PrivateRoute path="/admin/home" exact component={AdminHome}/>
          <PrivateRoute path="/admin/category" component={AdminCategory}/>
          <PrivateRoute path="/admin/products"component={AdminProducts} />
          <PrivateRoute path="/admin/orders/statistics" component={AdminOrderStatistics}/>
          <PrivateRoute path="/admin/BILL" component={BILL}/>
          <PrivateRoute path="/admin/orders/actions" component={AdminOrderAction}/>
          <Route path="/admin/signin" component={AdminAccountSignin}/>
          <Route path="/admin/signup" component={AdminAccountSignup}/>
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
  );
}

export default App;
