import React, { useState } from 'react'
import Layout from '../../../components/Admin/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../../components/UI/Input';

import {adminLogin} from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import './style.css';

/**
* @author
* @function AdminAccountSignin
**/

const AdminAccountSignin = (props) => {
  
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye} />;
    const adminAuth = useSelector(state => state.adminAuth);
  
    const dispatch = useDispatch();

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
  
    const adminAccountLogin = (e) => {
  
      e.preventDefault();
      if(mobile==='' && password===''){
        toast.dark("Enter Mobile Number and Password",{position:'top-center', transition:Zoom});
        return;
      }else{
        if(mobile===''){
          toast.dark("Enter Mobile Number",{position: 'top-center', transition:Zoom});
          return;
        }else if(mobile!==''){
          if(isNaN(mobile)){
            toast.dark("Mobile Number must be Number(0-9)",{position: 'top-center', transition: Zoom});
            return;
          }else if(mobile.length !==10){
            toast.dark("Enter 10 Digit mobile Number",{position:'top-center', transition: Zoom});
            return;
          }
        }
        if(password===''){
          toast.dark("Enter Password", {position:'top-center', transition:Zoom });
          return;
        }else{
          if(password.length < 6){
            toast.dark("Password Must be at least of 6 character", {position:'top-center', transition: Zoom});
            return true;
          }
        }
      }
      const admin = {
        mobile,
        password
      }
      //passing the user object to login function.
      dispatch(adminLogin(admin));
    }
  
    if(adminAuth.adminAuthenticate){
      return <Redirect to={`/admin/home`} />
    }
   
  
    return (
      <Layout>
        <Container className="signinSignupContainer">
          <Row className="signinSignupRow">
            <Col>
              <Form onSubmit={adminAccountLogin}>
               
                <Input
                  label="Mobile Number"
                  placeholder="9811771892"
                  value={mobile}
                  type="text"
                  onChange={(e) => setMobile(e.target.value)}
                  errorMessage="we will never share your Mobile Number"
                />
  
                <Input
                  label="Password"
                  placeholder="Enter password"
                  value={password}
                  type={passwordShown ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                />
  
                <Button className="signinSignupBtn" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
            <i className={passwordShown ? "eyeIconShow" : "eyeIcon"} onClick={togglePasswordVisiblity}>{eye}</i>
          </Row>
        </Container>
      </Layout>
    )
  }

export default AdminAccountSignin