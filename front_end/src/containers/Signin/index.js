import React, { useState } from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import Header from '../../components/Header';
import { userLogin } from '../../actions';
/**
* @author
* @function UserAccountSignin
**/

const UserAccountSignin = (props) => {
  
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const auth = useSelector(state => state.auth);
  
    const dispatch = useDispatch();
  
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
          <Container>
            <Row style={{marginTop: '120px'}}>
              <Col md={{span: 6, offset: 3}}>
                <Form onSubmit={userAccountLogin}>
                
                  <Input
                    label="Mobile Number"
                    placeholder="Mobile"
                    value={mobile}
                    type="text"
                    onChange={(e) => setMobile(e.target.value)}
                    errormessage="we will never share your Mobile Number"
                  />
    
                  <Input
                    label="Password"
                    placeholder="password"
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
    
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
      </>
    )
  }

export default UserAccountSignin