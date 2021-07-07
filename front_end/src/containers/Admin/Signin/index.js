import React, { useState } from 'react'
import Layout from '../../../components/Admin/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../../components/UI/Input';

import {adminLogin} from '../../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';

/**
* @author
* @function AdminAccountSignin
**/

const AdminAccountSignin = (props) => {
  
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const adminAuth = useSelector(state => state.adminAuth);
  
    const dispatch = useDispatch();
  
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
        <Container>
          <Row style={{marginTop: '120px'}}>
            <Col md={{span: 6, offset: 3}}>
              {/* here userLogin is function */}
              <Form onSubmit={adminAccountLogin}>
               
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

export default AdminAccountSignin