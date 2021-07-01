import React, { useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from  '../../../components/UI/Input';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {adminSignup} from '../../../actions';

/**
* @author
* @function AdminAccountSignup
**/

const AdminAccountSignup = (props) => {

  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const userAccountSignup = (e) => {
    
    e.preventDefault();
    if(mobile==='' && password===''){
      alert("Enter Mobile Number and Password");
    }else{
      if(mobile===''){
        alert("Enter Mobile Number");
        return;
      }else if(mobile!==''){
        if(isNaN(mobile)){
          alert("Mobile Number must be Number(0-9)");
          return;
        }else if(mobile.length !==10){
          alert("Enter 10 Digit mobile Number");
          return;
        }
      }
      if(password===''){
        alert("Enter Password");
        return;
      }else{
        if(password.length < 6){
          alert("Password Must be at least of 6 character");
        }
      }
    }
    const user = {
      fullName,
      mobile,
      password
    }
    dispatch(adminSignup(user));
  }

  if(auth.adminAuthenticate){
    return <Redirect to={`/admin/home`} />
  }

  if(auth.loading){
    return <p>Loading...!</p>
  }

  return (
    <Layout>
      <Container>
        {user.message}
        <Row style={{ marginTop: '120px' }}>
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
                Submit
              </Button>

            </Form>
          </Col>
        </Row>
      </Container>
    </Layout>
  )

}

export default AdminAccountSignup