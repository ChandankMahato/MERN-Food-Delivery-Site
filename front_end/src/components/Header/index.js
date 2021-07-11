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
  var params = currentUrl.split('3000/')[1];
  
  useEffect(() => {
    if(params === "admin/signin" || 
       params === "admin/signup" ||
       params === "admin/home" ||
       params === "admin/banner" || 
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
            <li className="nav-item">
                <NavLink to="/admin/signup" className="nav-link">Register</NavLink>
            </li>
        </Nav>
    );
}

const renderAdminLoggedInLinks = () => {
    return(
        <Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={adminLogout} >Logout</span>
            </li>
            <li className="sidebar-item"><NavLink to={`/`} exact style={{color:'#ffba4a'}}>Home</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/banner`} style={{color:'#ffba4a'}}>Banner</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/category`} style={{color:'#ffba4a'}}>Category</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/products`} style={{color:'#ffba4a'}}>Products</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/orders/statistics`} style={{color:'#ffba4a'}}>Order Statistics</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/orders/actions`} style={{color:'#ffba4a'}}>Order Actions</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/KOT`} style={{color:'#ffba4a'}}>KOT</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/admin/BILL`} style={{color:'#ffba4a'}}>BILL</NavLink></li>
        </Nav>
    );
}

  const renderUserNonLoggedInLinks = () => {
    return (
        <Nav>
            <li className="nav-item">
              <a href={`/login`}><span className="nav-link" style={{color:'#ffffff'}}>Login</span></a>
            </li>
            <li className="nav-item">
              <a href={`/register`}><span className="nav-link" style={{color:'#ffffff'}}>Register</span></a>
            </li>
        </Nav>
    );
}

const renderUserLoggedInLinks = () => {
    return(
        <Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={userLogout} style={{color:'#ffffff'}} >Logout</span>
            </li>
            <li className="nav-item">
              <a href={`/cart`}><span className="nav-link" style={{color:'#ffffff'}}>Cart</span></a>
            </li>
            <li className="nav-item">
              <a href={`/order`}><span className="nav-link" style={{color:'#ffffff'}}>Order</span></a>
            </li>
        </Nav>
    );
}

return (
  <>
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{zIndex: 20}}>
        <Container fluid>
          {check ? (<Link to="/admin/home" className="navbar-brand"><img src={logo} alt="nothing" height={30} width={30}/>Admin Dashboard</Link>) 
          : (<Link to="/" className="navbar-brand"><img src={logo} alt="nothing" height={30} width={30}/>Get Your Food</Link>)}
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