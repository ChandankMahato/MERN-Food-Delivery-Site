import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import logo from './images/Logo/logo.jpg';
import './style.css';
import { isUserLoggedIn, userSignout, isAdminLoggedIn, adminSignout} from '../../actions';

/**
* @author
* @function Header
**/


const Header = (props) => {
  
  const auth = useSelector(state => state.auth);
  const adminAuth = useSelector(state => state.adminAuth);
  const dispatch = useDispatch();

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
    if(check === true){
      isAdminLoggedIn();
      return;
    }
    isUserLoggedIn();
  }, [check])


  const userLogout = () => {
    dispatch(userSignout());
    setTimeout(function(){ window.location.reload() }, 1000);
  }

  const adminLogout = () => {
    dispatch(adminSignout());
}

const renderAdminNonLoggedInLinks = () => {
    return (
        <Nav>
            <li className="nav-item">
                <NavLink to="/admin/signin" className="nav-link">Login</NavLink>
            </li>
        </Nav>
    );
}

const renderAdminLoggedInLinks = () => {
    return(
        <Nav>
            <li className="nav-item">
                <NavLink to="/admin/signup" className="nav-link">Register</NavLink>
            </li>
            <li className="nav-item">
                <span className="nav-link" onClick={adminLogout} >Logout</span>
            </li>
            <li className="sidebar-item"><NavLink to={`/`} exact>Home</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/banner`}>Banner</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/category`}>Category</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/products`}>Products</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/feedback`}>Feedbacks</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/orders/statistics`}>Order Statistics</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/orders/actions`}>Order Actions</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/KOT`}>KOT</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/BILL`}>BILL</NavLink></li>
            <li className="sidebar-item"><NavLink className="nav-link" to={`/admin/customers`}>Customers</NavLink></li>
            <li className="sidebar-item"><NavLink className="nav-link" to={`/admin/export`}>Export</NavLink></li>
        </Nav>
    );
}

  const renderUserNonLoggedInLinks = () => {
    return (
        <Nav>
            <li className="nav-item">
              <a href={`/login`}><span className="nav-link">Login</span></a>
            </li>
            <li className="nav-item">
              <a href={`/register`}><span className="nav-link">Register</span></a>
            </li>
        </Nav>
    );
}

const renderUserLoggedInLinks = () => {
    return(
        <Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={userLogout}>Logout</span>
            </li>
            <li className="nav-item">
              <a href={`/cart`}><span className="nav-link">Cart</span></a>
            </li>
            <li className="nav-item">
              <a href={`/checkout`}><span className="nav-link">Checkout</span></a>
            </li>
            <li className="nav-item">
              <a href={`/order`}><span className="nav-link">Order</span></a>
            </li>
        </Nav>
    );
}

return (
  <>
    <Navbar collapseOnSelect className="nav-color" fixed="top" expand="lg" variant="dark" style={{zIndex: 20}}>
        <Container fluid>
          {check ? (<Link to="/admin/home" className="navbar-brand"><img src={logo} alt="nothing"/><span>Admin Dashboard</span></Link>) 
          : (<Link to="/" className="navbar-brand"><img src={logo} alt="nothing"/><span>Get Your Food</span></Link>)}
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
               <Nav className="mr-auto">
               </Nav>
               {!check ? (auth.userAuthenticate ? renderUserLoggedInLinks() : renderUserNonLoggedInLinks()):null}
               {check ? (adminAuth.adminAuthenticate ? renderAdminLoggedInLinks() : renderAdminNonLoggedInLinks()) : null}

            </Navbar.Collapse>
        </Container>
    </Navbar>
    </>
)

}

export default Header
