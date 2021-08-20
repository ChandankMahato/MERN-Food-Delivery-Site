import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Admin/Layout';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addResetCode, getAllCustomerDetails} from '../../../actions';
import Modal from '../../../components/UI/Modal';
import './style.css';

/**
* @author
* @function Customers
**/

const Customers = (props) => {
  const [customerDetailsModal, setCustomerDetailsModal] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [oneTimePassword, setOneTimePassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const dispatch = useDispatch();
  const customer = useSelector(state => state.customer);

  useEffect(() => {
    dispatch(getAllCustomerDetails());
  }, []);

  const renderCustomerDetails= () => {
    return (
      <Table className="tables" responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Role</th>
            <th style={{textAlign:'center'}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customer.customers.length > 0
            ? customer.customers.map((customer, index) => (
              <tr key={customer._id}>
                <td>{index+1}</td>
                <td>{customer.fullName}</td>
                <td>{customer.mobile}</td>
                <td>{customer.role}</td>
                <td style={{width:'25%', textAlign:'center'}}>
                  <div style={{height:'30px'}}>
                    <button className="actionBtns" onClick={() => showOneTimePasswordSettingModal(customer)}>
                      Send
                    </button>
                  </div>
                </td>
              </tr>
            ))
            :null}
        </tbody>
      </Table>
    )
  }

  const showOneTimePasswordSettingModal = (customer) => {
    setCustomerDetails(customer);
    setMobileNumber(customer.mobile);
    setOneTimePassword(Math.floor(Math.random()*1000000));
    setCustomerDetailsModal(true);
  }

  const renderShowMessageDetailsModal = () => {
    if (!customerDetails) {
      return null;
    }
  
  const sendOTPRequest = () => {
    
    const OTPData = {
      oneTimePassword,
      mobileNumber,
    }
    dispatch(addResetCode(OTPData));
    setCustomerDetailsModal(false);
  }

    return (
      <Modal
        show={customerDetailsModal}
        close={() => setCustomerDetailsModal(false)}
        modaltitle={'Customer Details'}
        btntitle ={'Send OTP'}
        size="sm"
        save={sendOTPRequest}
      >
        <Row>
          <Col md="6">
            <label className="key">Name</label>
            <p className="value">{customerDetails.fullName}</p>
          </Col>
          
        </Row>
        <Row>
        <Col md="6">
            <label className="key">Mobile</label>
            <p className="value">{customerDetails.mobile}</p>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <label className="key">Role</label>
            <p className="value">{customerDetails.role}</p>
          </Col>
        </Row>
        <Row>
            <Col md="12">
                <label className="key">Reset Code</label>
                <p className="value">{oneTimePassword}</p>
            </Col>
        </Row>
      </Modal>
    );
  }

  return (
    <Layout sidebar>

      <Container className="feedbackContainer">
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Customers</h3>
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            {renderCustomerDetails()}
          </Col>
        </Row>
      </Container>
      {renderShowMessageDetailsModal()}
    </Layout>
  )

}

export default Customers