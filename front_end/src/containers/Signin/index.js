import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import Modal from '../../components/UI/Modal';
import Header from '../../components/Header';
import { userLogin, resetRequest } from '../../actions';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import './style.css';

/**
* @author
* @function UserAccountSignin
**/

const UserAccountSignin = (props) => {
  
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const eye = <FontAwesomeIcon icon={faEye} />;
    const auth = useSelector(state => state.auth);
  
    const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
    const [typeCode, setTypeCode] = useState('');
    const [resetPassword, setResetPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');


    const dispatch = useDispatch();

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };

    
  const showForgotPasswordModal = () => {
    setForgotPasswordModal(true);
  }

  const sendPasswordResetRequest= () => {
    if(mobileNumber === '' && typeCode === ''){
      toast.dark('Enter Mobile Number and Reset-Code', {position: 'top-center', transition: Zoom});
      return;
    }else{
      if(mobileNumber === ''){
        toast.dark("Enter Mobile Number", {position: 'top-center', transition:Zoom});
        return;
      }else if(mobileNumber!==''){
        if(isNaN(mobileNumber)){
          toast.dark("Mobile Number must be Number(0-9", {position: 'top-center', transition: Zoom});
          return;
        }else if(mobileNumber.length !== 10){
          toast.dark("Enter 10 digit mobile Number", {position: 'top-center', transition: Zoom});
          return;
        }
      }
      if(typeCode === ''){
        toast.dark("Enter Reset-Code", {position: 'top-center', transition: Zoom});
        return;
      }
      if(resetPassword === ''){
        toast.dark("Enter New Password", {position: 'top-center', transition: Zoom});
        return;
      }
    }
    const userData = {
      typeCode,
      mobileNumber,
      resetPassword
    }
    dispatch(resetRequest(userData));
    setTypeCode('');
    setMobileNumber('');
    setResetPassword('');
    setForgotPasswordModal(false);
  }

  const closeFeedbackModal = () => {
    setTypeCode('');
    setMobileNumber('');
    setResetPassword('');
    setForgotPasswordModal(false);
  }
  
    const userAccountLogin = (e) => {
  
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
      const user = {
        mobile,
        password
      }
      dispatch(userLogin(user));
    }
  
    if(auth.userAuthenticate){
      return <Redirect to={`/`} />
    }
   
  
    return (
      <>
      <Modal
          show={forgotPasswordModal}
          close={closeFeedbackModal}
          modaltitle={'Forgot Password'}
          size="md"
          save={sendPasswordResetRequest}
          btntitle={'Reset'}
        >
        <Input 
          label="Reset Code"
          value={typeCode}
          placeholder={`Click the Messenger Icon, tap Get Reset Code`}
          onChange={(e) => setTypeCode(e.target.value)}
        />

        <Input 
          label="Mobile Number"
          type={Number}
          value={mobileNumber}
          placeholder={`Enter Your Mobile Number`}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <Input 
          label="New Password"
          type={Number}
          value={resetPassword}
          placeholder={`Enter Your New Password`}
          onChange={(e) => setResetPassword(e.target.value)}
        />
        
      </Modal>
        <Header/>
          <Container className="signinSignupContainer">
            <Row className="signinSignupRow">
              <Col>
                <Form onSubmit={userAccountLogin}>
                
                  <Input
                    label="Mobile Number"
                    placeholder="Enter Mobile Number"
                    value={mobile}
                    type="text"
                    onChange={(e) => setMobile(e.target.value)}
                    errorMessage="we will never share your Mobile Number"
                  />
    
                  <Input
                    label="Password"
                    placeholder={"Enter password"}
                    value={password}
                    type={passwordShown ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="forgotPassword" onClick={() => showForgotPasswordModal()}>
                    Forgot Password?
                  </p>
                  <Button  className="signinSignupBtn" type="submit">
                    Login
                  </Button>
                </Form>
              </Col>
              <i className={passwordShown ? "eyeIconShow" : "eyeIcon"} onClick={togglePasswordVisiblity}>{eye}</i>      
            </Row>
          </Container>
      </>
    )
  }

export default UserAccountSignin