import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from  '../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Zoom } from 'react-toastify';
import Header from '../../components/Header';
import { userSignup } from '../../actions';

/**
* @author
* @function UserAccountSignup
**/

const UserAccountSignup = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const userAccountSignup = (e) => {
    
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
      fullName,
      mobile,
      password
    }
    dispatch(userSignup(user));
  }

  if(auth.userAuthenticate){
    return <Redirect to={`/`} />
  }

  if(auth.loading){
    return <p>Loading...!</p>
  }

  return (
    <>
      <Header/>
        <Container>
          {user.message}
          <Row  style={{marginTop: '120px'}}>
            <Col md={{ span: 6, offset: 3 }}>
              <Form onSubmit={userAccountSignup}>
                
              <Input
                  label="Full Name"
                  placeholder="Full Name"
                  value={fullName}
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                />
              
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
                  Register
                </Button>

              </Form>
            </Col>
          </Row>
        </Container>
    </>
  )

}

export default UserAccountSignup