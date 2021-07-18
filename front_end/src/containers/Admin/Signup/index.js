import React, { useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from  '../../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {adminSignup} from '../../../actions';
import { toast, Zoom } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import '../Signin/style.css';

/**
* @author
* @function AdminAccountSignup
**/

const AdminAccountSignup = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const adminAuth = useSelector(state => state.adminAuth);
  const user = useSelector(state => state.user);
  const [passwordShown, setPasswordShown] = useState(false);
  const eye = <FontAwesomeIcon icon={faEye} />;
  const dispatch = useDispatch();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };


  const adminAccountSignup = (e) => {
    
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
      fullName,
      mobile,
      password
    }
    dispatch(adminSignup(admin));
  }

  if(adminAuth.adminAuthenticate){
    return <Redirect to={`/admin/home`} />
  }

  if(adminAuth.loading){
    return <p>Loading...!</p>
  }

  return (
    <Layout>
      <Container className="signinSignupContainer">
        {user.message}
        <Row className="signinSignupRow">
          <Col>
            <Form onSubmit={adminAccountSignup}>
              
            <Input
                label="Full Name"
                placeholder="FullName"
                value={fullName}
                type="text"
                onChange={(e) => setFullName(e.target.value)}
              />
            
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

export default AdminAccountSignup