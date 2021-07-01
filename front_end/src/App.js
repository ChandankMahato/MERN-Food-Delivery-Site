import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './containers/Home';
import Cart from './containers/Cart';
import CheckoutPage from './containers/CheckoutPage';
import { useDispatch, useSelector } from 'react-redux';
import About from './containers/About';

import { getAdminInitialData, getCartItems, isAdminLoggedIn, isUserLoggedIn, updateCart } from './actions';
import AdminAccountSignin from './containers/Admin/Signin';
import AdminAccountSignup from './containers/Admin/Signup';
import PrivateRoute from './components/Admin/HOC/PrivateRoute';
import AdminHome from './containers/Admin/AdminHome';
import AdminCategory from './containers/Admin/Category';
import AdminProducts from './containers/Admin/Products';
import AdminOrders from './containers/Admin/Orders';
import {Bounce, Slide, toast, ToastContainer, Zoom } from 'react-toastify';

toast.configure();

function App() {

  const dispatch = useDispatch( );
  const auth = useSelector(state => state.auth);

  const [check, setCheck] = useState(false);

  var currentUrl = window.location.href;
  var params = currentUrl.split('3000/')[1];
  console.log('hello');
  
  useEffect(() => {
    if(params === "admin/signin" || params === "admin/signup" || 
       params === "admin/home" || params === "admin/products" ||
       params === "admin/category" || params === "admin/orders"){
      setCheck(true);
    }
  },[params])

  useEffect(() => {
    if(!auth.userAuthenticate && check === false){
      dispatch(isUserLoggedIn());
    }
    dispatch(updateCart());
  }, [auth.userAuthenticate]);

  useEffect(() => {
    if(!auth.adminAuthenticate && check === true){
      dispatch(isAdminLoggedIn());
    }
  }, [auth.adminAuthenticate]);

  useEffect(() => {
    if(auth.adminAuthenticate && check === true){
      dispatch(getAdminInitialData());
    }
  },[auth.adminAuthenticate]);
  
 
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/about" component={About} />

          {/* admin starts here */}
          <PrivateRoute path="/admin/home" exact component={AdminHome}/>
          <PrivateRoute path="/admin/category" component={AdminCategory}/>
          <PrivateRoute path="/admin/products"component={AdminProducts} />
          <PrivateRoute path="/admin/orders" component={AdminOrders}/>
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
