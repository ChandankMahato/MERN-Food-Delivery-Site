import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import Header from '../../components/Header';
import { userLogin } from '../../actions';
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
  
    const dispatch = useDispatch();

    const togglePasswordVisiblity = () => {
      setPasswordShown(passwordShown ? false : true);
    };
  
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