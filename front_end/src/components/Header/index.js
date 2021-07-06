import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Navbar, Nav, Container, } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import Modal from '../../components/UI/Modal';
import Input from '../../components/UI/Input';
import logo from './images/Logo/logo.jpg';
import './style.css';
import { isUserLoggedIn, userLogin, userSignout, userSignup, isAdminLoggedIn, adminSignout} from '../../actions';
import {toast, Zoom} from 'react-toastify';

/**
* @author
* @function Header
**/

toast.configure();

const Header = (props) => {
  
  const auth = useSelector(state => state.auth);
  const adminAuth = useSelector(state => state.adminAuth);
  const dispatch = useDispatch();

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const [userSigninModal, setUserSigninModal] = useState(false);
  const [userSignupModal, setUserSignupModal] = useState(false);

  const [check, setCheck] = useState(false);

  var currentUrl = window.location.href;
  var params = currentUrl.split('3000/')[1];
  
  useEffect(() => {
    if(params === "admin/signin" || params === "admin/signup" ||
       params === "admin/home" || params === "admin/products" ||
       params === "admin/category" || params === "admin/orders"){
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


  const userAccountLogin = () => {
    if(mobile==='' && password===''){
      toast.dark("Enter Mobile Number and Password", {position:'top-center', transition: Zoom});
      return;
    }else{
      if(mobile===''){
        toast.dark("Enter Mobile Number",{position:'top-center', transition: Zoom});
        return;
      }else if(mobile!==''){
        if(isNaN(mobile)){
          toast.dark("Mobile Number must be Number(0-9)",{position:'top-center', transition: Zoom});
          return;
        }else if(mobile.length !==10){
          toast.dark("Enter 10 Digit mobile Number",{position:'top-center', transition: Zoom});
          return;
        }
      }
      if(password===''){
        toast.dark("Enter Password",{position:'top-center', transition: Zoom});
        return;
      }else{
        if(password.length < 6){
          toast.dark("Password Must be at least of 6 character",{position:'top-center', transition: Zoom});
          return;
        }
      }
    }
    const user = {
      mobile,
      password
    }
    dispatch(userLogin(user));
    setUserSigninModal(false);

    setMobile('');
    setPassword('')
  }

  const userAccountSignup = (e) => {
    e.preventDefault();
    if(mobile==='' && password===''){
      toast.dark("Enter Mobile Number and Password",{position:'top-center', transition: Zoom});
      return;
    }else{
      if(mobile===''){
        toast.dark("Enter Mobile Number",{position:'top-center', transition: Zoom});
        return;
      }else if(mobile!==''){
        if(isNaN(mobile)){
          toast.dark("Mobile Number must be Number(0-9)",{position:'top-center', transition: Zoom});
          return;
        }else if(mobile.length !==10){
          toast.dark("Enter 10 Digit mobile Number",{position:'top-center', transition: Zoom});
          return;
        }
      }
      if(password===''){
        toast.dark("Enter Password",{position:'top-center', transition: Zoom});
        return;
      }else{
        if(password.length < 6){
          toast.dark("Password Must be at least of 6 character",{position:'top-center', transition: Zoom});
          return;
        }
      }
    }
    const user = {
      fullName,
      mobile,
      password
    }
    dispatch(userSignup(user));
    setUserSignupModal(false);

    setFullName('');
    setMobile('');
    setPassword('');
  }

  const userLogout = () => {
    dispatch(userSignout());
    setTimeout(function(){ window.location.reload() }, 1000);
  }

  const adminLogout = () => {
    dispatch(adminSignout());
}

  
  const closeUserSigninModal = () => {
    setUserSigninModal(false);
  }

  const closeUserSignupModal = () => {
    setUserSignupModal(false);
  }

  const showUserSigninModal = (auth) => {
    setUserSigninModal(true);
  }

  const showUserSignupModal = () => {
    setUserSignupModal(true);
  }

  const renderUserSigninModal = () => {
    return(
      <Modal
        show={userSigninModal}
        close={closeUserSigninModal}
        modaltitle = {'Login Here'}
        save={userAccountLogin}
        btntitle={'Login'}
      >
        <Form>
          <Input 
            label="Mobile Number"
            placeholder = "Mobile"
            value={mobile}
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            errormessage="We will never share your Mobile Number"
          />

          <Input
            label="password"
            placeholder="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        
      </Modal>
    )
  }

  const renderUserSignupModal = () => {
    return(
      <Modal
        show={userSignupModal}
        close={closeUserSignupModal}
        modaltitle = {'Register Here'}
        save={userAccountSignup}
        btntitle={'Register'}
      >
        <Form>
          <Input
                label="Full Name"
                placeholder="Full Name"
                value={fullName}
                type="text"
                onChange={(e) => setFullName(e.target.value)}
            />

          <Input 
            label="Mobile Number"
            placeholder = "Mobile"
            value={mobile}
            type="text"
            onChange={(e) => setMobile(e.target.value)}
            errormessage="We will never share your Mobile Number"
          />

          <Input
            label="password"
            placeholder="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form>
        
      </Modal>
    )
 
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
            <li className="sidebar-item"><NavLink to={`/category`} style={{color:'#ffba4a'}}>Category</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/products`} style={{color:'#ffba4a'}}>Products</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/orders`} style={{color:'#ffba4a'}}>Order</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/KOT`} style={{color:'#ffba4a'}}>KOT</NavLink></li>
            <li className="sidebar-item"><NavLink to={`/BILL`} style={{color:'#ffba4a'}}>BILL</NavLink></li>
        </Nav>
    );
}

  const renderUserNonLoggedInLinks = () => {
    return (
        <Nav>
            <li className="nav-item">
                <span className="nav-link" onClick={showUserSigninModal} style={{color:'#ffffff'}}>Login</span>
            </li>
            <li className="nav-item">
                <span className="nav-link" onClick={showUserSignupModal} style={{color:'#ffffff'}}>Register</span>
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
    {renderUserSigninModal()}
    {renderUserSignupModal()}
    </>
)

}

export default Header